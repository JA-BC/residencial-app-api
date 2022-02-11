import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ResidenteEntity } from "./residente.entity";

@Entity('Vehiculo')
export class VehiculoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    matricula: string;

    @Column()
    descripcion: string;

    @ManyToOne(type => ResidenteEntity, x => x.id)
    residente: ResidenteEntity;
}