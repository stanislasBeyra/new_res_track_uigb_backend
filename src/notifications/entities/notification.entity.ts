import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exit } from '../../exits/entities/exit.entity';

export enum NotificationType {
  EXIT_CREATED = 'EXIT_CREATED',
  EXIT_APPROVED = 'EXIT_APPROVED',
  EXIT_REJECTED = 'EXIT_REJECTED',
  EXIT_RETURN = 'EXIT_RETURN',
  EXIT_LATE = 'EXIT_LATE',
  SYSTEM = 'SYSTEM',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ name: 'exit_id', nullable: true })
  exitId?: number;

  @ManyToOne(() => Exit, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exit_id' })
  exit?: Exit;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @Column({ name: 'read_at', type: 'timestamp', nullable: true })
  readAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;
}
