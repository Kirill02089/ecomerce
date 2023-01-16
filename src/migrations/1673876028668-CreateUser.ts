import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUser1673876028668 implements MigrationInterface {
  name = 'CreateUser1673876028668'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT '1'`
    )
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`)
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phoneNumber" character varying`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "verified" boolean NOT NULL DEFAULT '0'`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "reputation" integer DEFAULT '1'`
    )
    await queryRunner.query(`ALTER TABLE "user" ADD "bio" text`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reputation"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verified"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`)
  }
}
