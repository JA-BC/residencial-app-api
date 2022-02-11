import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TipoResidente')
export class TipoResidenteEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    descripcion: string;

}