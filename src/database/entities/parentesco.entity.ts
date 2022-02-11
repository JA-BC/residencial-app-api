import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Parentesco')
export class ParentescoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    descripcion: string;

}