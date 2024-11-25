import { Shipment } from 'src/shipments/entities/shipment.entity';
import { User } from 'src/users/entities/user.entity';
import { TaskStatus } from 'src/common/enums/task-status.enum';
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

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Shipment, { nullable: false })
  @JoinColumn({ name: 'shipment_id' })
  shipment: Shipment;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date;
}
