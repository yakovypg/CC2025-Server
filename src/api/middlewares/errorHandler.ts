import { Request, Response, NextFunction } from "express";
import { StatusCode } from "status-code-enum";

import {
  InternalServerError,
  NotSupportedError,
  UserExistsError,
  UserNotFoundError
} from "../../infrastructure/errors";

export const errorHandler = async (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error);

  if (error instanceof UserNotFoundError || error instanceof UserExistsError) {
    res.status(StatusCode.ClientErrorBadRequest).json(error.message ?? "Bad request");
  } else if (error instanceof NotSupportedError || error instanceof InternalServerError) {
    res.status(StatusCode.ServerErrorInternal).json(error.message ?? "Internal server error");
  } else if (error instanceof Error) {
    res.status(StatusCode.ServerErrorInternal).json(error.message ?? "Unknown server error");
  } else {
    res.status(StatusCode.ServerErrorInternal).json("Unknown server error");
  }
};
