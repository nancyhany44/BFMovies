import { MigrationInterface, QueryRunner } from "typeorm";

export class Rolecreation1722700183297 implements MigrationInterface {
    name = 'Rolecreation1722700183297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "role" (
            "role_id" SERIAL PRIMARY KEY,  
            "role" "role_types_enum" NOT NULL DEFAULT 'user'            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "role_types_enum"`);

    }

}

