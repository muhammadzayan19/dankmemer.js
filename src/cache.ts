export class Cache {
  private store = new Map<string, { expires: number; value: unknown }>();

  constructor(private ttlMs: number) {}

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  set(key: string, value: unknown): void {
    this.store.set(key, {
      value,
      expires: Date.now() + this.ttlMs
    });
  }

  clear(): void {
    this.store.clear();
  }
}
