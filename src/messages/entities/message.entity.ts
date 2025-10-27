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

// ============= MESSAGE ENTITY =============
@Entity('messages')
@Index('idx_sender', ['senderId', 'senderType'])
@Index('idx_receiver', ['receiverId', 'receiverType'])
@Index('idx_group_messages', ['groupId'])
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sender_id', type: 'int' })
  senderId: number;

  @Column({
    name: 'sender_type',
    type: 'enum',
    enum: SenderType,
  })
  senderType: SenderType;

  @Column({ name: 'receiver_id', type: 'int', nullable: true })
  receiverId: number;

  @Column({
    name: 'receiver_type',
    type: 'enum',
    enum: ReceiverType,
    nullable: true,
  })
  receiverType: ReceiverType;

  @Column({ name: 'group_id', type: 'int', nullable: true })
  groupId: number;

  @Column({ name: 'message_content', type: 'text' })
  messageContent: string;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'sent_at', type: 'timestamp' })
  sentAt: Date;

  // Relations
  @ManyToOne(() => Group, (group) => group.messages, { nullable: true })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;
}
