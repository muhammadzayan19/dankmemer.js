import { Cache } from "./cache";

export interface HttpClientOptions {
  baseUrl?: string;
  cacheTTL?: number;
  maxRetries?: number;
  userAgent?: string;
}

export class HttpClient {
  readonly baseUrl: string;
  readonly cache: Cache;
  readonly maxRetries: number;
  readonly userAgent?: string;

  constructor(options: HttpClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? "https://api.dankalert.xyz/dank";
    this.cacheTTL = options.cacheTTL ?? 5_000;
    this.cache = new Cache(this.cacheTTL);
    this.maxRetries = options.maxRetries ?? 3;
    this.userAgent = options.userAgent;
  }

  private cacheTTL: number;

  async get<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const cached = this.cache.get<T>(url);
    if (cached) return cached;

    let attempt = 0;

    while (true) {
      const res = await fetch(url, {
        headers: {
          ...(this.userAgent ? { "User-Agent": this.userAgent } : {})
        }
      });

      if (res.status === 429 && attempt < this.maxRetries) {
        const retryAfter = Number(res.headers.get("Retry-After")) || (attempt + 1) * 1000;
        await new Promise(r => setTimeout(r, retryAfter));
        attempt++;
        continue;
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} for ${url}: ${text}`);
      }

      const data = (await res.json()) as T;
      this.cache.set(url, data);
      return data;
    }
  }
}
