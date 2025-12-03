export interface BaseEntity {
  id?: string | number;
  name?: string;
  [key: string]: unknown;
}

export interface Item extends BaseEntity {}
export interface NPC extends BaseEntity {}
export interface Bait extends BaseEntity {}
export interface Bucket extends BaseEntity {}
export interface Creature extends BaseEntity {}
export interface Decoration extends BaseEntity {}
export interface EventEntity extends BaseEntity {}
export interface LocationEntity extends BaseEntity {}
export interface Season extends BaseEntity {}
export interface Skill extends BaseEntity {}
export interface SkillData extends BaseEntity {}
export interface Tank extends BaseEntity {}
export interface Tool extends BaseEntity {}
export interface AllEntity extends BaseEntity {}
