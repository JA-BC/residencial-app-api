import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Calle')
export class CalleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    distancia?: string;
}