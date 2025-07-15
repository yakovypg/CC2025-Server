import { Response } from "express";
import { StatusCode } from "status-code-enum";

export const safeInvoke = async (
  res: Response,
  action: () => Promise<void>,
  errorCode: StatusCode = StatusCode.ServerErrorInternal,
  errorMessage: string = "Internal server error"
) => {
  const catchAction = () => {
    res.status(errorCode).json(errorMessage);
  };

  await safeInvokeCustom(res, action, catchAction);
};

export const safeInvokeCustom = async (
  res: Response,
  action: () => Promise<void>,
  catchAction: ((res: Response, error: unknown) => void) | null = null
) => {
  catchAction ??= (res, _) => {
    res.status(StatusCode.ServerErrorInternal).json("Internal server error");
  };

  try {
    await action();
  } catch (error) {
    console.log(error);
    catchAction(res, error);
  }
};
