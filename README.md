# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `yarn install` command
2. Setup database settings in env file:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=users
```
3. Run `yarn start:prod` (will run db migrations as well) or `yarn start` command for development.
4. To run db migrations deparately please use `migration:run`
