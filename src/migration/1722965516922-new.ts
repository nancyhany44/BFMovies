import { MigrationInterface, QueryRunner } from "typeorm";

export class New1722965516922 implements MigrationInterface {
    name = 'New1722965516922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "episode_id" integer NOT NULL, "description" text NOT NULL, "director" character varying NOT NULL, "producer" character varying NOT NULL, "release_date" date NOT NULL, "url" character varying NOT NULL, "genre" character varying NOT NULL, "rating" double precision, "created" TIMESTAMP NOT NULL DEFAULT now(), "edited" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_57b8120c249399f77244fbf0e55" UNIQUE ("episode_id"), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "birth_year" character varying NOT NULL, "eye_color" character varying NOT NULL, "gender" character varying NOT NULL, "hair_color" character varying NOT NULL, "height" character varying NOT NULL, "mass" character varying NOT NULL, "skin_color" character varying NOT NULL, "homeworld" character varying NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

}
