import { BaseEntity } from "./types";

export type EntityPredicate<T extends BaseEntity> = (entity: T) => boolean;

export function IN<T extends BaseEntity>(
  field: keyof T & string,
  ...values: string[]
): EntityPredicate<T> {
  const lowered = values.map(v => v.toLowerCase());
  return (entity: T) => {
    const raw = entity[field];
    if (typeof raw !== "string") return false;
    const val = raw.toLowerCase();
    return lowered.some(v => val.includes(v));
  };
}

export function Fuzzy<T extends BaseEntity>(
  field: keyof T & string,
  term: string,
  cutoff = 60
): EntityPredicate<T> {
  const target = term.toLowerCase();

  // Levenshtein distance algorithm for better fuzzy matching
  const levenshtein = (a: string, b: string): number => {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  const similarity = (a: string, b: string): number => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    
    // Exact match
    if (a === b) return 100;
    
    // Check if one contains the other (partial match)
    if (a.includes(b) || b.includes(a)) return 90;
    
    const distance = levenshtein(a, b);
    const maxLength = Math.max(a.length, b.length);
    return ((maxLength - distance) / maxLength) * 100;
  };

  return (entity: T) => {
    const raw = entity[field];
    if (typeof raw !== "string") return false;
    return similarity(raw, target) >= cutoff;
  };
}

export function Above<T extends BaseEntity>(
  field: keyof T & string,
  threshold: number
): EntityPredicate<T> {
  return (entity: T) => {
    const raw = entity[field];
    if (typeof raw !== "number") return false;
    return raw > threshold;
  };
}

export function Below<T extends BaseEntity>(
  field: keyof T & string,
  threshold: number
): EntityPredicate<T> {
  return (entity: T) => {
    const raw = entity[field];
    if (typeof raw !== "number") return false;
    return raw < threshold;
  };
}

export function Range<T extends BaseEntity>(
  field: keyof T & string,
  min: number,
  max: number
): EntityPredicate<T> {
  return (entity: T) => {
    const raw = entity[field];
    if (typeof raw !== "number") return false;
    return raw >= min && raw <= max;
  };
}

export function and<T extends BaseEntity>(
  ...predicates: EntityPredicate<T>[]
): EntityPredicate<T> {
  return (entity: T) => predicates.every(fn => fn(entity));
}

export function or<T extends BaseEntity>(
  ...predicates: EntityPredicate<T>[]
): EntityPredicate<T> {
  return (entity: T) => predicates.some(fn => fn(entity));
}