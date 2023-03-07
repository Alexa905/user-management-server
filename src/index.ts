import path from "path";

process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "config/");
import config from "config";
import App from "./app";
import { AppDataSource } from "./config/dataSource.config";

AppDataSource.initialize()
  .then(async () => {
    const port = config.get<number>("port");
    const application = new App(port);
    application.listen();
  })
  .catch((error) => console.log(error));
