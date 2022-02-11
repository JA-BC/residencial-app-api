import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1641852201136 implements MigrationInterface {
    name = 'Initial1641852201136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Calle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar NOT NULL, "distancia" varchar)`);
        await queryRunner.query(`CREATE TABLE "Parentesco" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "descripcion" varchar(50) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "TipoResidente" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "descripcion" varchar(50) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "Residente" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dni" varchar NOT NULL, "nombre" varchar NOT NULL, "apellido" varchar NOT NULL, "telefono" varchar NOT NULL, "nacimiento" date NOT NULL, "genero" varchar(1) NOT NULL, "activo" boolean NOT NULL, "fechaCreacion" date NOT NULL, "fechaActualizacion" date, "residenciaId" integer, "tipoResidenteId" integer, "parentescoId" integer)`);
        await queryRunner.query(`CREATE TABLE "TipoResidencia" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "descripcion" varchar(50) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "Residencia" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "numero" varchar NOT NULL, "piso" integer, "poblada" boolean NOT NULL DEFAULT (0), "fechaCreacion" date NOT NULL, "fechaActualizacion" date, "propietarioId" integer, "calleId" integer, "tipoResidenciaId" integer)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9c1926457968fc66a4cbfdf55e" ON "Residencia" ("calleId", "numero") `);
        await queryRunner.query(`CREATE TABLE "Role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "descripcion" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "User" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar NOT NULL, "correo" varchar NOT NULL, "password" varchar NOT NULL, "hashPassword" varchar NOT NULL, "sessionToken" varchar, "roleId" integer)`);
        await queryRunner.query(`CREATE TABLE "Vehiculo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "matricula" varchar NOT NULL, "descripcion" varchar NOT NULL, "residenteId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_Residente" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dni" varchar NOT NULL, "nombre" varchar NOT NULL, "apellido" varchar NOT NULL, "telefono" varchar NOT NULL, "nacimiento" date NOT NULL, "genero" varchar(1) NOT NULL, "activo" boolean NOT NULL, "fechaCreacion" date NOT NULL, "fechaActualizacion" date, "residenciaId" integer, "tipoResidenteId" integer, "parentescoId" integer, CONSTRAINT "FK_57a021f086aeff9307240244ddc" FOREIGN KEY ("residenciaId") REFERENCES "Residencia" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8beb5974fbb1cf72e53e2aa9ad1" FOREIGN KEY ("tipoResidenteId") REFERENCES "TipoResidente" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_459456eba1e8a6a06820df2e668" FOREIGN KEY ("parentescoId") REFERENCES "Parentesco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Residente"("id", "dni", "nombre", "apellido", "telefono", "nacimiento", "genero", "activo", "fechaCreacion", "fechaActualizacion", "residenciaId", "tipoResidenteId", "parentescoId") SELECT "id", "dni", "nombre", "apellido", "telefono", "nacimiento", "genero", "activo", "fechaCreacion", "fechaActualizacion", "residenciaId", "tipoResidenteId", "parentescoId" FROM "Residente"`);
        await queryRunner.query(`DROP TABLE "Residente"`);
        await queryRunner.query(`ALTER TABLE "temporary_Residente" RENAME TO "Residente"`);
        await queryRunner.query(`DROP INDEX "IDX_9c1926457968fc66a4cbfdf55e"`);
        await queryRunner.query(`CREATE TABLE "temporary_Residencia" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "numero" varchar NOT NULL, "piso" integer, "poblada" boolean NOT NULL DEFAULT (0), "fechaCreacion" date NOT NULL, "fechaActualizacion" date, "propietarioId" integer, "calleId" integer, "tipoResidenciaId" integer, CONSTRAINT "FK_1347708c9b7d32e3d8975a46ca3" FOREIGN KEY ("propietarioId") REFERENCES "Residente" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c243a2c471fbd9bdc6a720fabb0" FOREIGN KEY ("calleId") REFERENCES "Calle" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6c022c78e0dd3cd4de34c69fb5a" FOREIGN KEY ("tipoResidenciaId") REFERENCES "TipoResidencia" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Residencia"("id", "numero", "piso", "poblada", "fechaCreacion", "fechaActualizacion", "propietarioId", "calleId", "tipoResidenciaId") SELECT "id", "numero", "piso", "poblada", "fechaCreacion", "fechaActualizacion", "propietarioId", "calleId", "tipoResidenciaId" FROM "Residencia"`);
        await queryRunner.query(`DROP TABLE "Residencia"`);
        await queryRunner.query(`ALTER TABLE "temporary_Residencia" RENAME TO "Residencia"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9c1926457968fc66a4cbfdf55e" ON "Residencia" ("calleId", "numero") `);
        await queryRunner.query(`CREATE TABLE "temporary_User" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar NOT NULL, "correo" varchar NOT NULL, "password" varchar NOT NULL, "hashPassword" varchar NOT NULL, "sessionToken" varchar, "roleId" integer, CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_User"("id", "nombre", "correo", "password", "hashPassword", "sessionToken", "roleId") SELECT "id", "nombre", "correo", "password", "hashPassword", "sessionToken", "roleId" FROM "User"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`ALTER TABLE "temporary_User" RENAME TO "User"`);
        await queryRunner.query(`CREATE TABLE "temporary_Vehiculo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "matricula" varchar NOT NULL, "descripcion" varchar NOT NULL, "residenteId" integer, CONSTRAINT "FK_6024a0b946d111e5780d2cdfef2" FOREIGN KEY ("residenteId") REFERENCES "Residente" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Vehiculo"("id", "matricula", "descripcion", "residenteId") SELECT "id", "matricula", "descripcion", "residenteId" FROM "Vehiculo"`);
        await queryRunner.query(`DROP TABLE "Vehiculo"`);
        await queryRunner.query(`ALTER TABLE "temporary_Vehiculo" RENAME TO "Vehiculo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Vehiculo" RENAME TO "temporary_Vehiculo"`);
        await queryRunner.query(`CREATE TABLE "Vehiculo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "matricula" varchar NOT NULL, "descripcion" varchar NOT NULL, "residenteId" integer)`);
        await queryRunner.query(`INSERT INTO "Vehiculo"("id", "matricula", "descripcion", "residenteId") SELECT "id", "matricula", "descripcion", "residenteId" FROM "temporary_Vehiculo"`);
        await queryRunner.query(`DROP TABLE "temporary_Vehiculo"`);
        await queryRunner.query(`ALTER TABLE "User" RENAME TO "temporary_User"`);
        await queryRunner.query(`CREATE TABLE "User" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar NOT NULL, "correo" varchar NOT NULL, "password" varchar NOT NULL, "hashPassword" varchar NOT NULL, "sessionToken" varchar, "roleId" integer)`);
        await queryRunner.query(`INSERT INTO "User"("id", "nombre", "correo", "password", "hashPassword", "sessionToken", "roleId") SELECT "id", "nombre", "correo", "password", "hashPassword", "sessionToken", "roleId" FROM "temporary_User"`);
        await queryRunner.query(`DROP TABLE "temporary_User"`);
        await queryRunner.query(`DROP INDEX "IDX_9c1926457968fc66a4cbfdf55e"`);
        await queryRunner.query(`ALTER TABLE "Residencia" RENAME TO "temporary_Residencia"`);
        await queryRunner.query(`CREATE TABLE "Residencia" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "numero" varchar NOT NULL, "piso" integer, "poblada" boolean NOT NULL DEFAULT (0), "fechaCreacion" date NOT NULL, "fechaActualizacion" date, "propietarioId" integer, "calleId" integer, "tipoResidenciaId" integer)`);
        await queryRunner.query(`INSERT INTO "Residencia"("id", "numero", "piso", "poblada", "fechaCreacion", "fechaActualizacion", "propietarioId", "calleId", "tipoResidenciaId") SELECT "id", "numero", "piso", "poblada", "fechaCreacion", "fechaActualizacion", "propietarioId", "calleId", "tipoResidenciaId" FROM "temporary_Residencia"`);
        await queryRunner.query(`DROP TABLE "temporary_Residencia"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9c1926457968fc66a4cbfdf55e" ON "Residencia" ("calleId", "numero") `);
        await queryRunner.query(`ALTER TABLE "Residente" RENAME TO "temporary_Residente"`);
        await queryRunner.query(`CREATE TABLE "Residente" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dni" varchar NOT NULL, "nombre" varchar NOT NULL, "apellido" varchar NOT NULL, "telefono" varchar NOT NULL, "nacimiento" date NOT NULL, "genero" varchar(1) NOT NULL, "activo" boolean NOT NULL, "fechaCreacion" date NOT NULL, "fechaActualizacion" date, "residenciaId" integer, "tipoResidenteId" integer, "parentescoId" integer)`);
        await queryRunner.query(`INSERT INTO "Residente"("id", "dni", "nombre", "apellido", "telefono", "nacimiento", "genero", "activo", "fechaCreacion", "fechaActualizacion", "residenciaId", "tipoResidenteId", "parentescoId") SELECT "id", "dni", "nombre", "apellido", "telefono", "nacimiento", "genero", "activo", "fechaCreacion", "fechaActualizacion", "residenciaId", "tipoResidenteId", "parentescoId" FROM "temporary_Residente"`);
        await queryRunner.query(`DROP TABLE "temporary_Residente"`);
        await queryRunner.query(`DROP TABLE "Vehiculo"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP INDEX "IDX_9c1926457968fc66a4cbfdf55e"`);
        await queryRunner.query(`DROP TABLE "Residencia"`);
        await queryRunner.query(`DROP TABLE "TipoResidencia"`);
        await queryRunner.query(`DROP TABLE "Residente"`);
        await queryRunner.query(`DROP TABLE "TipoResidente"`);
        await queryRunner.query(`DROP TABLE "Parentesco"`);
        await queryRunner.query(`DROP TABLE "Calle"`);
    }

}
