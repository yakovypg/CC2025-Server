import https from "https";

import dotenv from "dotenv";
import express from "express";

if (process.env.IS_DEBUG) {
  dotenv.config({ path: ".env.development" });
}

import { HttpsServerConfig, isHttpsServerConfig, ServerConfig } from "./configuration";
import { DATABASE_CONNECTOR } from "./infrastructure/data";
import { LOGGER } from "./infrastructure/loggers";
import { configureApp, loadServerConfig } from "./utils";

async function main() {
  const config: HttpsServerConfig | ServerConfig | null = loadServerConfig();

  if (config === null) {
    LOGGER.warn("Bad configuration");
    process.exit(1);
  }

  await DATABASE_CONNECTOR.connect();
  await DATABASE_CONNECTOR.initialize();

  const app: express.Express = express();
  configureApp(app);

  if (isHttpsServerConfig(config)) {
    https.createServer(config.httpsConfig, app).listen(config.port, config.host, () => {
      LOGGER.info(`Server is running on https://${config.host}:${config.port}`);
    });
  } else {
    app.listen(config.port, config.host, () => {
      LOGGER.info(`Server is running on http://${config.host}:${config.port}`);
    });
  }
}

main();
