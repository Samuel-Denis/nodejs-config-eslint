import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class CreateColumnTypeInProduct1633890273717 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products',
        new TableColumn(
           {
               name: 'type',
               type: 'varchar',
               isNullable: true
           },
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "type")
    }

}
