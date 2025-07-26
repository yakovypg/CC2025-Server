import fs from "fs";

import cors from "cors";
import express, { Express } from "express";

import { errorHandler } from "../api/middlewares";
import { cardRoutes, userRoutes } from "../api/routes";
import { HttpsConfig, ServerConfig } from "../configuration";

export const loadHttpsConfig = (): HttpsConfig | null => {
  const httpsKeyPath = process.env.HTTPS_KEY_PATH;
  const httpsCertPath = process.env.HTTPS_CERT_PATH;

  if (!httpsKeyPath || !httpsCertPath) {
    return null;
  }

  try {
    return {
      key: fs.readFileSync(httpsKeyPath),
      cert: fs.readFileSync(httpsCertPath)
    };
  } catch {
    return null;
  }
};

export const loadServerConfig = (): ServerConfig | null => {
  const port = Number(process.env.PORT);
  const host = process.env.HOST;
  const httpsConfig = loadHttpsConfig();

  if (Number.isNaN(port) || !host || !httpsConfig) {
    return null;
  }

  return {
    port: port,
    host: host,
    httpsConfig: httpsConfig
  };
};

export const configureApp = (app: Express): void => {
  app.use(express.json());
  app.use(cors());

  app.use("/api/user", userRoutes);
  app.use("/api/card", cardRoutes);

  app.use(errorHandler);
};
