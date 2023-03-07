import { JsonController, Get } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/health")
export class HealthController {
  constructor() {}

  @Get("/")
  @OpenAPI({ summary: "Check health" })
  get() {
    return "OK";
  }
}
