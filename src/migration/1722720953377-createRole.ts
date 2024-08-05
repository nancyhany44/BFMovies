import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRole1722720953377 implements MigrationInterface {
    name = 'CreateRole1722720953377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_role_enum" AS ENUM('admin', 'user', 'test')`);
        await queryRunner.query(`CREATE TABLE "role" ("role_id" SERIAL NOT NULL, "role" "public"."role_role_enum" NOT NULL, CONSTRAINT "PK_1f2d0f57af9e3c81dae93a7582b" PRIMARY KEY ("role_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_role_enum"`);
    }

}
