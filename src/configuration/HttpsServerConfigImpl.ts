import { HttpsConfig } from "./HttpsConfig";
import { HttpsServerConfig } from "./HttpsServerConfig";
import { ServerConfigImpl } from "./ServerConfigImpl";

export class HttpsServerConfigImpl extends ServerConfigImpl implements HttpsServerConfig {
  constructor(
    host: string,
    port: number,
    useHttps: boolean,
    public readonly httpsConfig: HttpsConfig
  ) {
    super(host, port, useHttps);
  }
}
