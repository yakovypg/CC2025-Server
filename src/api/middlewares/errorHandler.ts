import { Request, Response, NextFunction } from "express";
import { StatusCode } from "status-code-enum";

import {
  InternalServerError,
  NotFoundError,
  NotSupportedError,
  UserExistsError
} from "../../infrastructure/errors";
import { LOGGER } from "../../infrastructure/loggers";

export const errorHandler = async (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<void> => {
  LOGGER.error({ err: error });

  if (error instanceof NotFoundError) {
    res.status(StatusCode.ClientErrorNotFound).json(error.message ?? "Not found");
  } else if (error instanceof UserExistsError) {
    res.status(StatusCode.ClientErrorBadRequest).json(error.message ?? "Bad request");
  } else if (error instanceof NotSupportedError || error instanceof InternalServerError) {
    res.status(StatusCode.ServerErrorInternal).json(error.message ?? "Internal server error");
  } else if (error instanceof Error) {
    res.status(StatusCode.ServerErrorInternal).json(error.message ?? "Unknown server error");
  } else {
    res.status(StatusCode.ServerErrorInternal).json("Unknown server error");
  }
};
