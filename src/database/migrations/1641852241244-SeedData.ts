import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedData1641852241244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO TipoResidencia VALUES (1, 'Casa')`);
        await queryRunner.query(`INSERT INTO TipoResidencia VALUES (2, 'Apartamento')`);
        await queryRunner.query(`INSERT INTO TipoResidencia VALUES (3, 'Otros')`);
        await queryRunner.query(`INSERT INTO TipoResidente VALUES (1, 'Propietario')`);
        await queryRunner.query(`INSERT INTO TipoResidente VALUES (2, 'Inquilino')`);
        await queryRunner.query(`INSERT INTO TipoResidente VALUES (3, 'Dependiente')`);
        await queryRunner.query(`INSERT INTO TipoResidente VALUES (4, 'Otros')`);
        await queryRunner.query(`INSERT INTO Parentesco VALUES (1, 'Ninguno')`);
        await queryRunner.query(`INSERT INTO Parentesco VALUES (2, 'Padre/Madre')`);
        await queryRunner.query(`INSERT INTO Parentesco VALUES (3, 'Hemano/Hermana')`);
        await queryRunner.query(`INSERT INTO Parentesco VALUES (4, 'Otros')`);
        await queryRunner.query(`INSERT INTO Role VALUES (1, 'Administrador')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE "TipoResidencia"`);
        await queryRunner.query(`TRUNCATE TABLE "TipoResidente"`);
        await queryRunner.query(`TRUNCATE TABLE "Parentesco"`);
        await queryRunner.query(`TRUNCATE TABLE "Role"`);
    }


}
