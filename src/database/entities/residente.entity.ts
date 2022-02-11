import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ParentescoEntity } from "./parentesco.entity";
import { ResidenciaEntity } from "./residencia.entity";
import { TipoResidenteEntity } from "./tipo-residente.entity";

@Entity('Residente')
export class ResidenteEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    telefono: string;

    @Column({ type: 'date', update: false })
    nacimiento: Date;

    @Column({ length: 1 })
    genero: string;

    @Column()
    activo: boolean;

    @Column({ update: false, type: 'date' })
    fechaCreacion: Date;

    @Column({ type: 'date', nullable: true })
    fechaActualizacion: Date;

    @ManyToOne(type => ResidenciaEntity, x => x.id)
    residencia: ResidenciaEntity;

    @ManyToOne(type => TipoResidenteEntity, x => x.id)
    tipoResidente: TipoResidenteEntity;

    @ManyToOne(type => ParentescoEntity, x => x.id)
    parentesco: ParentescoEntity;

    @BeforeInsert()
    onBeforeInsert() {
        this.fechaCreacion = new Date();
    }

    @BeforeUpdate()
    onBeforeUpdate() {
        this.fechaActualizacion = new Date();
    }
}