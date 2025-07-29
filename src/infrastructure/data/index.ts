import { DatabaseConnector } from "./DatabaseConnector";
import { MongoDbConnector } from "./MongoDbConnector";

export const DATABASE_CONNECTOR: DatabaseConnector = new MongoDbConnector();
export type { DatabaseConnector };
