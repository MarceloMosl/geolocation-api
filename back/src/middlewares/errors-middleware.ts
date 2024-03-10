import { Errback, ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(err: any, req: Request, res: Response, next: NextFunction) {
 
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}