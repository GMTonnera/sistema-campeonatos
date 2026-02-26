import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1772134308260 implements MigrationInterface {
    name = 'InitialSchema1772134308260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "championship" ("championship_id" SERIAL NOT NULL, "championship_name" character varying(80) NOT NULL, "championship_description" character varying(500) NOT NULL, "championship_startDate" TIMESTAMP NOT NULL, "championship_endDate" TIMESTAMP, "championship_minTeams" integer NOT NULL, "championship_maxTeams" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_478adc558291aac1c902fb7ae70" PRIMARY KEY ("championship_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."match_match_status_enum" AS ENUM('unscheduled', 'scheduled', 'in progress', 'finished', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "match" ("match_id" SERIAL NOT NULL, "match_datetime" TIMESTAMP NOT NULL, "match_location" character varying(150) NOT NULL, "match_status" "public"."match_match_status_enum" NOT NULL, "match_homeTeamPontuation" integer, "match_visitingTeamPontuation" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "matchChampionshipChampionshipId" integer NOT NULL, "matchHomeTeamTeamId" integer NOT NULL, "matchVisitingTeamTeamId" integer NOT NULL, CONSTRAINT "PK_2e7d516f3dc97d9e2f882212d2b" PRIMARY KEY ("match_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d9efc9fcbe629df7ddcda82146" ON "match" ("matchChampionshipChampionshipId", "match_datetime") `);
        await queryRunner.query(`CREATE TABLE "team" ("team_id" SERIAL NOT NULL, "team_name" character varying(50) NOT NULL, "team_acronym" character varying(3) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a35a345d4436b82adf6bb76f3ce" PRIMARY KEY ("team_id"))`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_907b7484eff6d47cfc0681e9f91" FOREIGN KEY ("matchChampionshipChampionshipId") REFERENCES "championship"("championship_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_dfca2f9d0a7af340639a0011ddb" FOREIGN KEY ("matchHomeTeamTeamId") REFERENCES "team"("team_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_d6cb2a3f9042441ebea7458b5ec" FOREIGN KEY ("matchVisitingTeamTeamId") REFERENCES "team"("team_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_d6cb2a3f9042441ebea7458b5ec"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_dfca2f9d0a7af340639a0011ddb"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_907b7484eff6d47cfc0681e9f91"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d9efc9fcbe629df7ddcda82146"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TYPE "public"."match_match_status_enum"`);
        await queryRunner.query(`DROP TABLE "championship"`);
    }

}
