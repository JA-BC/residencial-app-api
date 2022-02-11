import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CalleEntity } from "./calle.entity";
import { ResidenteEntity } from "./residente.entity";
import { TipoResidenciaEntity } from "./tipo-residencia.entity";

@Entity('Residencia')
@Index(["calle", "numero"], { unique: true })
export class ResidenciaEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero: string;

    @Column({ nullable: true })
    piso?: number;
    
    @Column({ default: false })
    poblada: boolean;
    
    @Column({ update: false, type: 'date' })
    fechaCreacion: Date;

    @Column({ type: 'date', nullable: true })
    fechaActualizacion: Date;

    @ManyToOne(type => ResidenteEntity, x => x.id)
    propietario: ResidenteEntity;

    @ManyToOne(type => CalleEntity, x => x.id)
    calle: CalleEntity;

    @ManyToOne(x => TipoResidenciaEntity, x => x.id)
    tipoResidencia: TipoResidenciaEntity;

    @BeforeInsert()
    onBeforeInsert() {
        this.fechaCreacion = new Date();
    }

    @BeforeUpdate()
    onBeforeUpdate() {
        this.fechaActualizacion = new Date();
    }
}