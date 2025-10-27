import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum, IsBoolean, MinLength, MaxLength, Matches } from 'class-validator';
import { UserRole } from '../../enum/userrole';
import { UserStatus } from '../../enum/userstatus';
import { UserLevel } from '../../enum/use_level';

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'Jean',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Dupont',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'jean.dupont@example.com',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password123!',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  password: string;

  @ApiPropertyOptional({
    description: 'User role',
    enum: UserRole,
    default: UserRole.STUDENT,
    example: UserRole.STUDENT,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be STUDENT or ADMIN' })
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Student ID (required for students)',
    example: 'STU2024001',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  studentId?: string;

  @ApiPropertyOptional({
    description: 'Education level',
    enum: UserLevel,
    default: UserLevel.Freshman,
    example: UserLevel.Freshman,
  })
  @IsOptional()
  @IsEnum(UserLevel, { message: 'Level must be Freshman, Sophomore, Junior, Senior, or Graduate' })
  level?: UserLevel;

  @ApiPropertyOptional({
    description: 'Room number',
    example: 'A101',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  roomNumber?: string;

  @ApiPropertyOptional({
    description: 'Phone number',
    example: '0705137055',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'User status',
    enum: UserStatus,
    default: UserStatus.PRESENT,
    example: UserStatus.PRESENT,
  })
  @IsOptional()
  @IsEnum(UserStatus, { message: 'Status must be PRESENT or ON_EXIT' })
  status?: UserStatus;
}
