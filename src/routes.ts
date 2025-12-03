import {
  AllEntity,
  Bait,
  Bucket,
  Creature,
  Decoration,
  EventEntity,
  Item,
  LocationEntity,
  NPC,
  Season,
  Skill,
  SkillData,
  Tank,
  Tool
} from "./types";
import { HttpClient } from "./http";
import { BaseEntity } from "./types/BaseEntity";
import { EntityPredicate } from "./filters";

export class BaseRoute<T extends BaseEntity> {
  constructor(
    protected readonly client: HttpClient,
    private readonly path: string
  ) {}

  async query(filter?: EntityPredicate<T>): Promise<T[]> {
    const data = await this.client.get<T[]>(this.path);
    if (!filter) return data;
    return data.filter(filter);
  }
}

export class ItemsRoute extends BaseRoute<Item> {
  constructor(client: HttpClient) {
    super(client, "/items");
  }
}

export class NPCsRoute extends BaseRoute<NPC> {
  constructor(client: HttpClient) {
    super(client, "/npcs");
  }
}

export class BaitsRoute extends BaseRoute<Bait> {
  constructor(client: HttpClient) {
    super(client, "/baits");
  }
}

export class BucketsRoute extends BaseRoute<Bucket> {
  constructor(client: HttpClient) {
    super(client, "/buckets");
  }
}

export class CreaturesRoute extends BaseRoute<Creature> {
  constructor(client: HttpClient) {
    super(client, "/creatures");
  }
}

export class DecorationsRoute extends BaseRoute<Decoration> {
  constructor(client: HttpClient) {
    super(client, "/decorations");
  }
}

export class EventsRoute extends BaseRoute<EventEntity> {
  constructor(client: HttpClient) {
    super(client, "/events");
  }
}

export class LocationsRoute extends BaseRoute<LocationEntity> {
  constructor(client: HttpClient) {
    super(client, "/locations");
  }
}

export class SeasonsRoute extends BaseRoute<Season> {
  constructor(client: HttpClient) {
    super(client, "/seasons");
  }
}

export class SkillsRoute extends BaseRoute<Skill> {
  constructor(client: HttpClient) {
    super(client, "/skills");
  }
}

export class SkillsDataRoute extends BaseRoute<SkillData> {
  constructor(client: HttpClient) {
    super(client, "/skillsdata");
  }
}

export class TanksRoute extends BaseRoute<Tank> {
  constructor(client: HttpClient) {
    super(client, "/tanks");
  }
}

export class ToolsRoute extends BaseRoute<Tool> {
  constructor(client: HttpClient) {
    super(client, "/tools");
  }
}

export class AllRoute extends BaseRoute<AllEntity> {
  constructor(client: HttpClient) {
    super(client, "/all");
  }
}
