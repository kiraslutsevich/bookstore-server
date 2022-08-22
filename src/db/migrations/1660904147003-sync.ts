import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1660904147003 implements MigrationInterface {
    name = 'sync1660904147003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "releasedAt" date
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "releasedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
