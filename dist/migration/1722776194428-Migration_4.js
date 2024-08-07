"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration41722776194428 = void 0;
class Migration41722776194428 {
    constructor() {
        this.name = 'Migration41722776194428';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    }
}
exports.Migration41722776194428 = Migration41722776194428;
