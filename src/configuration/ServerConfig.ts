import { HttpsConfig } from ".";

export interface ServerConfig {
  port: number;
  host: string;
  useHttps: boolean;
  httpsConfig: HttpsConfig;
}
