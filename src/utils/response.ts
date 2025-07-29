import { Response } from "express";
import { StatusCode } from "status-code-enum";

export const answer = (res: Response, statusCode: StatusCode, data: unknown): void => {
  res.status(statusCode).json(data);
};

export const answerBadRequest = (res: Response): void => {
  answer(res, StatusCode.ClientErrorBadRequest, "Recieved data is incorrect");
};

export const answerInternalError = (res: Response): void => {
  answer(res, StatusCode.ServerErrorInternal, "Internal server error");
};

export const answerSuccessOk = (res: Response, data: unknown = null): void => {
  answer(res, StatusCode.SuccessOK, data ?? "OK");
};

export const answerSuccessCreated = (res: Response, data: unknown = null): void => {
  answer(res, StatusCode.SuccessCreated, data ?? "Created");
};
