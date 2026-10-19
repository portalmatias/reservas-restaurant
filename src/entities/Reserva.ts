import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreCliente: string;

  @Column()
  telefono: string;

  @Column()
  cantidadPersonas: number;

  @Column({ type: "timestamp" })
  fecha: Date;

  @Column({ default: "pendiente" })
  estado: string;

  @Column({ type: "text", nullable: true })
  notas: string | null;
}
