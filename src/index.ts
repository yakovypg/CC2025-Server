import https from "https";
import dotenv from "dotenv";
import express from "express";

import { configureApp, loadServerConfig } from "./utils";
import { databaseConnector } from "./infrastructure/data";

async function main() {
  if (process.env.IS_DEBUG) {
    dotenv.config({ path: ".env-development" });
  }

  const config = loadServerConfig();

  if (!config) {
    console.error("Bad configuration");
    process.exit(1);
  }

  await databaseConnector.connect();
  await databaseConnector.initialize();

  const app = express();
  configureApp(app);

  https.createServer(config.httpsConfig, app).listen(config.port, config.host, () => {
    console.log(`Server is running on https://${config.host}:${config.port}`);
  });
}

main();
