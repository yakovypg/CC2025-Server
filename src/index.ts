import "express-async-errors";

import https from "https";
import dotenv from "dotenv";
import express from "express";

import { configureApp, loadServerConfig } from "./utils";
import { databaseConnector } from "./data";

dotenv.config({ path: ".env" });
const config = loadServerConfig();

if (!config) {
  console.error("Bad configuration");
  process.exit(1);
}

databaseConnector.connect();

const app = express();
configureApp(app);

https.createServer(config.httpsConfig, app).listen(config.port, config.host, () => {
  console.log(`Server is running on https://${config.host}:${config.port}`);
});
