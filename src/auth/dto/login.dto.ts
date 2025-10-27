import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address',
    example: 'jean@student.iugb.edu.ci',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
