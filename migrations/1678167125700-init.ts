import { MigrationInterface, QueryRunner } from "typeorm";

export class init1678167125700 implements MigrationInterface {
    name = 'init1678167125700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('fullstack', 'frontend', 'backend')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('full time', 'contractor', 'temporary unavailable')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "role" "public"."user_role_enum" NOT NULL, "status" "public"."user_status_enum" NOT NULL, "team_id" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_e211e4e3c0aa76047889fccbb1f" UNIQUE ("first_name", "last_name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_cf461f5b40cf1a2b8876011e1e1" UNIQUE ("name"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_155dbc144ff2bd4713fdf1f6c77" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`INSERT INTO "team"("name") VALUES ('Team A'), ('Team B'), ('Team C')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_155dbc144ff2bd4713fdf1f6c77"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
