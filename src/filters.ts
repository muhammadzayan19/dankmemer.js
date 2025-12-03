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
  cutoff = 80
): EntityPredicate<T> {
  const target = term.toLowerCase();

  const similarity = (a: string, b: string): number => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    const len = Math.min(a.length, b.length);
    if (len === 0) return 0;
    let matches = 0;
    for (let i = 0; i < len; i++) {
      if (a[i] === b[i]) matches++;
    }
    return (matches / Math.max(a.length, b.length)) * 100;
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
