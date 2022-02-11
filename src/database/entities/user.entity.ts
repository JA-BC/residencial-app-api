import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity('User')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    password: string;

    @Column()
    hashPassword: string;

    @Column({ nullable: true })
    sessionToken: string;

    @ManyToOne(type => RoleEntity, x => x.id)
    role: RoleEntity;
}