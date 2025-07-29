import https from "https";

import dotenv from "dotenv";
import express from "express";

if (process.env.IS_DEBUG) {
  dotenv.config({ path: ".env.development" });
}

import { isHttpsServerConfig } from "./configuration";
import { databaseConnector } from "./infrastructure/data";
import { logger } from "./infrastructure/loggers";
import { configureApp, loadServerConfig } from "./utils";

async function main() {
  const config = loadServerConfig();

  if (config === null) {
    logger.warn("Bad configuration");
    process.exit(1);
  }

  await databaseConnector.connect();
  await databaseConnector.initialize();

  const app = express();
  configureApp(app);

  if (isHttpsServerConfig(config)) {
    https.createServer(config.httpsConfig, app).listen(config.port, config.host, () => {
      logger.info(`Server is running on https://${config.host}:${config.port}`);
    });
  } else {
    app.listen(config.port, config.host, () => {
      logger.info(`Server is running on http://${config.host}:${config.port}`);
    });
  }
}

main();
