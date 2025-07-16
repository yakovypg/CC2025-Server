import { Response } from "express";
import { StatusCode } from "status-code-enum";

export const answer = (res: Response, statusCode: StatusCode, data: any) => {
  res.status(statusCode).json(data);
};

export const answerBadRequest = (res: Response) => {
  answer(res, StatusCode.ClientErrorBadRequest, "Recieved data is incorrect");
};

export const answerInternalError = (res: Response) => {
  answer(res, StatusCode.ServerErrorInternal, "Internal server error");
};

export const answerSuccessOk = (res: Response, data: any | null = null) => {
  answer(res, StatusCode.SuccessOK, data ?? "OK");
};

export const answerSuccessCreated = (res: Response, data: any | null = null) => {
  answer(res, StatusCode.SuccessCreated, data ?? "Created");
};
