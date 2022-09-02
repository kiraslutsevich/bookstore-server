import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1662114836465 implements MigrationInterface {
    name = 'sync1662114836465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "amoutCartItems" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "isBestseller" boolean
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "isBestseller"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "amoutCartItems"
        `);
    }

}
