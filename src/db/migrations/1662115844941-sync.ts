import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1662115844941 implements MigrationInterface {
    name = 'sync1662115844941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "isBestseller" boolean
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "isBestseller"
        `);
    }

}
