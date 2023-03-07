import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from "routing-controllers";
import { QueryFailedError } from "typeorm";

@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log("MY error", error);
    if (error instanceof HttpError) {
      response.status(error.httpCode);
    }
    if (error instanceof QueryFailedError) {
      response.status(500);
    }

    next(error);
  }
}
