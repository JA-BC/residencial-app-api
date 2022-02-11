import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Role')
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;
}