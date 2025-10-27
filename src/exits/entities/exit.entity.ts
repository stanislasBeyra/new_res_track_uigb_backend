import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ExitStatus } from 'src/enum/entry_exit_status';


@Entity('exits')
export class Exit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @ManyToOne(() => User, (user) => user.exits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: User;

  @Column({ type: 'varchar', length: 255 })
  reason: string;

  @Column({ type: 'varchar', length: 255 })
  destination: string;

  @Column({ name: 'departure_date', type: 'datetime' })
  departureDate: Date;

  @Column({ name: 'expected_return_date', type: 'datetime' })
  expectedReturnDate: Date;

  @Column({ name: 'actual_return_date', type: 'datetime', nullable: true })
  actualReturnDate?: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: ExitStatus,
    default: ExitStatus.EN_COURS,
  })
  status: ExitStatus;

  @Column({ name: 'delay_days', type: 'int', default: 0 })
  delayDays: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  // Méthode pour calculer le retard
  calculateDelay(): number {
    if (!this.actualReturnDate) {
      const now = new Date();
      if (now > this.expectedReturnDate) {
        const diffTime = Math.abs(now.getTime() - this.expectedReturnDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      return 0;
    }

    if (this.actualReturnDate > this.expectedReturnDate) {
      const diffTime = Math.abs(
        this.actualReturnDate.getTime() - this.expectedReturnDate.getTime(),
      );
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return 0;
  }

  // Méthode pour mettre à jour le statut
  updateStatus(): void {
    const delay = this.calculateDelay();
    this.delayDays = delay;

    if (this.actualReturnDate) {
      if (delay > 0) {
        this.status = ExitStatus.EN_RETARD;
      } else {
        this.status = ExitStatus.TERMINEE;
      }
    } else {
      const now = new Date();
      if (now > this.expectedReturnDate) {
        this.status = ExitStatus.EN_RETARD;
      } else {
        this.status = ExitStatus.EN_COURS;
      }
    }
  }
}
