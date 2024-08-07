import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11722681491688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
                    CREATE TABLE "users" (
                        "user_id" SERIAL PRIMARY KEY,
                        "name" varchar NOT NULL,
                        "username" varchar NOT NULL UNIQUE,
                        "password" varchar NOT NULL,
                        "role_id" integer,
                        CONSTRAINT "FK_role_user" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE
                    );
                END IF;
            END
            $$;
        `);
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
