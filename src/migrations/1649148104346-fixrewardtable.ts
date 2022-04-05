import {MigrationInterface, QueryRunner} from "typeorm";

export class fixrewardtable1649148104346 implements MigrationInterface {
    name = 'fixrewardtable1649148104346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reward\` ADD \`tribeReactionId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reward\` ADD \`transactionId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reward\` DROP COLUMN \`transactionId\``);
        await queryRunner.query(`ALTER TABLE \`reward\` DROP COLUMN \`tribeReactionId\``);
    }

}
