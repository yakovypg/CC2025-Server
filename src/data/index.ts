import { DatabaseConnector } from "./DatabaseConnector";
import { MongoDbConnector } from "./MongoDbConnector";

export const databaseConnector: DatabaseConnector = new MongoDbConnector();
export type { DatabaseConnector };
