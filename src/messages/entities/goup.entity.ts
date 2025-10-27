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
import { GroupMember } from './group_member.entity';
import { Message } from './message.entity';

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


// ============= GROUP ENTITY =============
@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_name', type: 'varchar', length: 200 })
  groupName: string;

  @Column({
    name: 'group_type',
    type: 'enum',
    enum: GroupType,
    default: GroupType.STUDENT,
  })
  groupType: GroupType;

  @Column({ name: 'created_by', type: 'int' })
  createdBy: number;

  @Column({
    name: 'creator_type',
    type: 'enum',
    enum: SenderType,
  })
  creatorType: SenderType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  // Relations
  @OneToMany(() => GroupMember, (member) => member.group)
  members: GroupMember[];

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[];
}
