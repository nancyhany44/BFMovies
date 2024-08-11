import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1722971161614 implements MigrationInterface {
    name = 'Update1722971161614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "birth_year" character varying NOT NULL, "eye_color" character varying NOT NULL, "gender" character varying NOT NULL, "hair_color" character varying NOT NULL, "height" character varying NOT NULL, "mass" character varying NOT NULL, "skin_color" character varying NOT NULL, "homeworld" character varying NOT NULL, "url" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "people"`);
    }

}
