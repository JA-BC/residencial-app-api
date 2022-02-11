import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('TipoResidencia')
export class TipoResidenciaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    descripcion: string;

}