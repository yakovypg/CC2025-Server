import { HttpsConfig } from "./HttpsConfig";
import { ServerConfig } from "./ServerConfig";

export interface HttpsServerConfig extends ServerConfig {
  httpsConfig: HttpsConfig;
}

export const isHttpsServerConfig = (
  config: HttpsServerConfig | ServerConfig | null
): config is HttpsServerConfig => {
  return config !== null && (config as HttpsServerConfig).httpsConfig !== undefined;
};
