import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration41722776194428 implements MigrationInterface {
  name = 'Migration41722776194428';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
  }
}
