import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('fcm_tokens')
@Index(['userId', 'token'], { unique: true })
export class FcmToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  token: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  deviceType?: string; // 'android', 'ios', 'web'

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviceId?: string;

  @Column({ type: 'simple-array', nullable: true })
  topics?: string[]; // Topics auxquels l'utilisateur est abonné

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'last_used_at', type: 'timestamp', nullable: true })
  lastUsedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
