import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolesAndUsers1622720953377 implements MigrationInterface {
    name = 'CreateRolesAndUsers1622720953377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the enum type for role
        await queryRunner.query(`CREATE TYPE "public"."role_role_enum" AS ENUM('admin', 'user', 'test')`);

        // Create the role table first
        await queryRunner.query(`
            CREATE TABLE "role" (
                "role_id" SERIAL NOT NULL,
                "role" "public"."role_role_enum" NOT NULL,
                CONSTRAINT "PK_df46160e6aa79943b83c81e496e" PRIMARY KEY ("role_id")
            )
        `);

        // Create the users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "user_id" INTEGER NOT NULL,
                "username" character varying NOT NULL UNIQUE,
                "name" character varying NOT NULL,
                "password" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "role_id" integer,
                CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"),
                CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the users table and its foreign key constraints
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`DROP TABLE "users"`);

        // Drop the role table
        await queryRunner.query(`DROP TABLE "role"`);

        // Drop the enum type
        await queryRunner.query(`DROP TYPE "public"."role_role_enum"`);
    }
}
