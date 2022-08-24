import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1661347958235 implements MigrationInterface {
    name = 'sync1661347958235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "dob"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "meanRating" integer
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "meanRating"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "dob" date
        `);
    }

}
