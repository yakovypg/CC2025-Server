export interface DatabaseConnector {
  connect(): Promise<void>;
  initialize(): Promise<void>;
}
