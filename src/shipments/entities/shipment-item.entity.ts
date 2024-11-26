import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shipment } from './shipment.entity';

@Entity('shipment_items')
export class ShipmentItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Shipment, { nullable: false })
  @JoinColumn({ name: 'shipment_id' })
  shipment: Shipment;

  @Column()
  description: string;

  @Column('integer')
  quantity: number;

  @Column('decimal')
  weight_per_unit: number;

  @Column('decimal')
  volume_per_unit: number;

  @Column('decimal')
  height: number;

  @Column('decimal')
  width: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;
}
