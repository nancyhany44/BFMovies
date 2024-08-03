"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration21722690210778 = void 0;
class Migration21722690210778 {
    constructor() {
        this.name = 'Migration21722690210778';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
}
exports.Migration21722690210778 = Migration21722690210778;
