import * as express from "express";
import "reflect-metadata";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
// @ts-ignore
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");
import compression from "compression";
import {
  createExpressServer,
  getMetadataArgsStorage,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from "swagger-ui-express";

const routingControllersOptions = {
  defaultErrorHandler: false,
  routePrefix: "/api",
  middlewares: [__dirname + "/middleware/*.ts"],
  controllers: [__dirname + "/controllers/*.ts"],
};

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = createExpressServer(routingControllersOptions);
    this.port = port;

    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.disable("x-powered-by");
    // Parse routing-controllers classes into OpenAPI spec:

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: "#/components/schemas/",
    });

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        // @ts-ignore
        schemas,
      },
      info: {
        description: "Generated with `routing-controllers-openapi`",
        title: "User API",
        version: "1.0.0",
      },
    });

    this.app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
