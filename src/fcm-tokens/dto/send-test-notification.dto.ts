// dto/send-test-notification.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SendTestNotificationDto {
  @ApiProperty({ 
    example: 1, 
    description: 'ID de l\'utilisateur',
    type: Number 
  })
  @IsInt()
  userId: number;

  @ApiProperty({ 
    example: 'Notification Test', 
    description: 'Titre de la notification',
    type: String 
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    example: 'Ceci est un message de test', 
    description: 'Corps de la notification',
    minLength: 3,
    type: String 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  body: string;
}