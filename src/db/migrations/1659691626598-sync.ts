import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1659691626598 implements MigrationInterface {
    name = 'sync1659691626598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
    }

}
