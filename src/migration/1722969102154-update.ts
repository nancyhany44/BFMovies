import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1722969102154 implements MigrationInterface {
    name = 'Update1722969102154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "genre"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "rating"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "rating" double precision`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "genre" character varying NOT NULL`);
    }

}
