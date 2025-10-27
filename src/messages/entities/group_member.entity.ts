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
import { Group } from './goup.entity';

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

// ============= GROUP MEMBER ENTITY =============
@Entity('group_members')
@Index('idx_group_members', ['groupId'])
@Index('idx_user_groups', ['userId', 'userType'])
@Index('unique_member', ['groupId', 'userId', 'userType'], { unique: true })
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id', type: 'int' })
  groupId: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: SenderType,
  })
  userType: SenderType;

  @CreateDateColumn({ name: 'joined_at', type: 'timestamp' })
  joinedAt: Date;

  // Relations
  @ManyToOne(() => Group, (group) => group.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: Group;
}
