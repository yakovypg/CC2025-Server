import dotenv from "dotenv";

if (process.env.IS_DEBUG) {
  dotenv.config({ path: ".env-development" });
}

import https from "https";
import express from "express";

import { configureApp, loadServerConfig } from "./utils";
import { databaseConnector } from "./infrastructure/data";
import { logger } from "./infrastructure/loggers"

async function main() {
  const config = loadServerConfig();

  if (!config) {
    logger.warn("Bad configuration");
    process.exit(1);
  }

  await databaseConnector.connect();
  await databaseConnector.initialize();

  const app = express();
  configureApp(app);

  https.createServer(config.httpsConfig, app).listen(config.port, config.host, () => {
    logger.info(`Server is running on https://${config.host}:${config.port}`);
  });
}

main();
