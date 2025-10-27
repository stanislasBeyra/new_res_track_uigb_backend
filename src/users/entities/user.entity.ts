import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/enum/userrole';
import { UserStatus } from 'src/enum/userstatus';
import { UserLevel } from 'src/enum/use_level';
import { Exit } from '../../exits/entities/exit.entity';
  
 
  
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    // Informations de base
    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    firstName: string;
  
    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    lastName: string;
  
    @Column({ type: 'varchar', length: 150, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255, select: false })
    password: string;
  
    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.STUDENT,
    })
    role: UserRole;
  
    // Informations spécifiques aux étudiants
    @Column({
      name: 'student_id',
      type: 'varchar',
      length: 50,
      unique: true,
      nullable: true,
    })
    studentId?: string;
  
    @Column({ type: 'enum', enum: UserLevel, nullable: true,default: UserLevel.Freshman })
    level?: UserLevel;
  
    @Column({ name: 'room_number', type: 'varchar', length: 20, nullable: true })
    roomNumber?: string;
  
    @Column({
      type: 'enum',
      enum: UserStatus,
      default: UserStatus.PRESENT,
      nullable: true,
    })
    status?: UserStatus;
  
    // Informations de contact
    @Column({ type: 'varchar', length: 20, nullable: true })
    phone?: string;
  
    // Photo de profil
    @Column({ name: 'profile_picture', type: 'varchar', length: 255, nullable: true })
    profilePicture?: string;
  
    // Statut du compte
    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;
  
    // Timestamps
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
  
    @Column({ name: 'last_login', type: 'timestamp', nullable: true })
    lastLogin?: Date;
  
    // Relations
    @OneToMany(() => Exit, (exit) => exit.student)
    exits: Exit[];
  
    // @OneToMany(() => Message, (message) => message.sender)
    // sentMessages: Message[];
  
    // @OneToMany(() => Notification, (notification) => notification.user)
    // notifications: Notification[];
  
    // Hooks pour hasher le mot de passe avant insertion/mise à jour
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      if (this.password && !this.password.startsWith('$2b$')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
    }
  
    // Méthodes utilitaires
    async validatePassword(password: string): Promise<boolean> {
      return await bcrypt.compare(password, this.password);
    }
  
    // Getter pour le nom complet
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  
    // Méthode pour vérifier si l'utilisateur est un étudiant
    isStudent(): boolean {
      return this.role === UserRole.STUDENT;
    }
  
    // Méthode pour vérifier si l'utilisateur est un admin
    isAdmin(): boolean {
      return this.role === UserRole.ADMIN;
    }
  
    // Méthode pour retourner l'utilisateur sans le mot de passe
    toJSON() {
      const { password, ...user } = this;
      return user;
    }
  }