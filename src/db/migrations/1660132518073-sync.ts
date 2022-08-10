import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1660132518073 implements MigrationInterface {
    name = 'sync1660132518073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "author" character varying NOT NULL,
                "description" text,
                "price" integer,
                "paperPrice" integer,
                "cover" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genres_genre" (
                "bookId" integer NOT NULL,
                "genreId" integer NOT NULL,
                CONSTRAINT "PK_75a197f32ed39286c5c39198ece" PRIMARY KEY ("bookId", "genreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_31d658e0af554165f4598158c5" ON "book_genres_genre" ("bookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_83bd32782d44d9db3d68c3f58c" ON "book_genres_genre" ("genreId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_31d658e0af554165f4598158c55" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre"
            ADD CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genres_genre" DROP CONSTRAINT "FK_31d658e0af554165f4598158c55"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_83bd32782d44d9db3d68c3f58c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_31d658e0af554165f4598158c5"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genres_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
    }

}
