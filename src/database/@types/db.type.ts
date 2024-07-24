import { User } from "../models/user.model";

type DB = "posgress";

export interface DataSource {
  type: DB;
  url: string;
  synchronize: boolean;
  logging: boolean;
  entities: [User];
  migrations: [];
  subscribers: [];
}
