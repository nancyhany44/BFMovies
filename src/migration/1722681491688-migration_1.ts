import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11722681491688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "user_id" SERIAL PRIMARY KEY,
                "name" varchar NOT NULL,
                "username" varchar NOT NULL UNIQUE,
                "password" varchar NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
