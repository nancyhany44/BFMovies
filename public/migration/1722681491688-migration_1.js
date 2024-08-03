"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration11722681491688 = void 0;
class Migration11722681491688 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "user_id" SERIAL PRIMARY KEY,
                "name" varchar NOT NULL,
                "username" varchar NOT NULL UNIQUE,
                "password" varchar NOT NULL
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.Migration11722681491688 = Migration11722681491688;
