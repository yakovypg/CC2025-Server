import fs from "fs";
import express, { Express, Request, Response, NextFunction } from "express";

import { StatusCode } from "status-code-enum";

import userRoutes from "../routes/user";
import cardRoutes from "../routes/card";

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

  app.use("/api/user", userRoutes);
  app.use("/api/card", cardRoutes);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);

    const status = err.statusCode || StatusCode.ServerErrorInternal;
    const message = err.message || "Internal Server Error";
    const stack = err.stack;

    res.status(StatusCode.ServerErrorInternal).json({
      error: {
        status: status,
        message: message,
        stack: stack
      }
    });
  });
};
