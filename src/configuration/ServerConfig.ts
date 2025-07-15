import { HttpsConfig } from "./";

export interface ServerConfig {
  port: number;
  host: string;
  httpsConfig: HttpsConfig;
}
