import { HttpClient, HttpClientOptions } from "./http";
import {
  AllRoute,
  BaitsRoute,
  BucketsRoute,
  CreaturesRoute,
  DecorationsRoute,
  EventsRoute,
  ItemsRoute,
  LocationsRoute,
  NPCsRoute,
  SeasonsRoute,
  SkillsDataRoute,
  SkillsRoute,
  TanksRoute,
  ToolsRoute
} from "./routes";

export interface DankMemerClientOptions extends HttpClientOptions {}

export class DankMemerClient {
  readonly http: HttpClient;

  readonly all: AllRoute;
  readonly baits: BaitsRoute;
  readonly buckets: BucketsRoute;
  readonly creatures: CreaturesRoute;
  readonly decorations: DecorationsRoute;
  readonly events: EventsRoute;
  readonly items: ItemsRoute;
  readonly locations: LocationsRoute;
  readonly npcs: NPCsRoute;
  readonly seasons: SeasonsRoute;
  readonly skills: SkillsRoute;
  readonly skillsdata: SkillsDataRoute;
  readonly tanks: TanksRoute;
  readonly tools: ToolsRoute;

  constructor(options: DankMemerClientOptions = {}) {
    this.http = new HttpClient(options);

    this.all = new AllRoute(this.http);
    this.baits = new BaitsRoute(this.http);
    this.buckets = new BucketsRoute(this.http);
    this.creatures = new CreaturesRoute(this.http);
    this.decorations = new DecorationsRoute(this.http);
    this.events = new EventsRoute(this.http);
    this.items = new ItemsRoute(this.http);
    this.locations = new LocationsRoute(this.http);
    this.npcs = new NPCsRoute(this.http);
    this.seasons = new SeasonsRoute(this.http);
    this.skills = new SkillsRoute(this.http);
    this.skillsdata = new SkillsDataRoute(this.http);
    this.tanks = new TanksRoute(this.http);
    this.tools = new ToolsRoute(this.http);
  }

  async close(): Promise<void> {
  }
}

