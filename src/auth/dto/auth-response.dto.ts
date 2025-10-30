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
      profilePicture: 'upload/profile-123.png',
      phone: '0705137055',
      studentId: 'STU2024001',
      level: 'Freshman',
      roomNumber: 'A101',
      status: 'PRESENT',
      isActive: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      lastLogin: '2024-01-01T00:00:00.000Z',
    },
  })
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    profilePicture?: string;
    phone?: string;
    studentId?: string;
    level?: string;
    roomNumber?: string;
    status?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
  };
}
