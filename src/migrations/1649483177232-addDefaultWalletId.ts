import {MigrationInterface, QueryRunner} from "typeorm";

export class addDefaultWalletId1649483177232 implements MigrationInterface {
    name = 'addDefaultWalletId1649483177232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`defaultWalletId\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`defaultWalletId\``);
    }

}
