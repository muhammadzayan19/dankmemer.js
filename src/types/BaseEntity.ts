export interface BaseEntity {
  id?: string | number;
  name?: string;
  [key: string]: any;
}