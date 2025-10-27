import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT Access Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
  })
  tokenType: string;

  @ApiProperty({
    description: 'Expiration time in seconds',
    example: 3600,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'User information',
    example: {
      id: 1,
      email: 'jean@student.iugb.edu.ci',
      firstName: 'Jean',
      lastName: 'Dupont',
      role: 'STUDENT',
    },
  })
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}
