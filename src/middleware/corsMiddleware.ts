import cors from "cors";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "before" })
export class CorsMiddleware implements ExpressMiddlewareInterface {
  public use(request: any, response: any, next: (err?: unknown) => void): any {
    return cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })(request, response, next);
  }
}
