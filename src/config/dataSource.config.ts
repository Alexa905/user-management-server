/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from "typeorm";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  migrationsTableName: "migrations",
  migrations: ["migrations/**/*.ts"],
  entities: ["src/entities/*.entity{.ts,.js}"],
});
