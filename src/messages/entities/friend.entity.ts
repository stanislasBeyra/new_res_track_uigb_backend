import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

// ============= ENUMS =============
export enum SenderType {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}

export enum ReceiverType {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  GROUP = 'GROUP',
}

export enum GroupType {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  MIXED = 'MIXED',
}

export enum FriendStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  BLOCKED = 'BLOCKED',
}

// ============= FRIEND ENTITY =============
@Entity('friends')
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id', type: 'int' })
  studentId: number;

  @Column({ name: 'requester_id', type: 'int' })
  requesterId: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: FriendStatus,
    default: FriendStatus.PENDING,
  })
  status: FriendStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'student_id' })
  student: User;

  // Note: La contrainte UNIQUE avec LEAST/GREATEST doit être gérée au niveau de la base de données
  // ou via un middleware/service pour éviter les doublons
}