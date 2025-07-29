import fs from "fs";

import cors from "cors";
import express, { Express } from "express";

import { errorHandler } from "../api/middlewares";
import { cardRoutes, userRoutes } from "../api/routes";
import {
  HttpsConfig,
  HttpsServerConfig,
  HttpsServerConfigImpl,
  ServerConfig,
  ServerConfigImpl
} from "../configuration";

export const loadHttpsConfig = (): HttpsConfig | null => {
  const httpsKeyPath: string | undefined = process.env.HTTPS_KEY_PATH;
  const httpsCertPath: string | undefined = process.env.HTTPS_CERT_PATH;

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

export const loadServerConfig = (): HttpsServerConfig | ServerConfig | null => {
  const port: number = Number(process.env.PORT);
  const host: string | undefined = process.env.HOST;
  const useHttps: boolean = process.env.USE_HTTPS === "1";

  if (Number.isNaN(port) || host === undefined) {
    return null;
  }

  if (useHttps) {
    const httpsConfig: HttpsConfig | null = loadHttpsConfig();

    return httpsConfig !== null
      ? new HttpsServerConfigImpl(host, port, useHttps, httpsConfig)
      : null;
  }

  return new ServerConfigImpl(host, port, useHttps);
};

export const configureApp = (app: Express): void => {
  app.use(express.json());
  app.use(cors());

  app.use("/api/user", userRoutes);
  app.use("/api/card", cardRoutes);

  app.use(errorHandler);
};
