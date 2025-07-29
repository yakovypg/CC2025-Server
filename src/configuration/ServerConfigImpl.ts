import { ServerConfig } from "./ServerConfig";

export class ServerConfigImpl implements ServerConfig {
  constructor(
    public readonly host: string,
    public readonly port: number,
    public readonly useHttps: boolean
  ) {}
}
