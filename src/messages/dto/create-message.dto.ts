import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { SenderType, ReceiverType } from '../entities/message.entity';

export class CreateMessageDto {
  @ApiPropertyOptional({
    description: 'ID du destinataire (pour message privé)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  receiverId?: number;

  @ApiPropertyOptional({
    description: 'Type du destinataire (optionnel - sera récupéré automatiquement depuis la base de données si non fourni)',
    enum: ReceiverType,
    example: ReceiverType.STUDENT,
  })
  @IsOptional()
  @IsEnum(ReceiverType)
  receiverType?: ReceiverType;

  @ApiPropertyOptional({
    description: 'ID du groupe (pour message de groupe)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  groupId?: number;

  @ApiProperty({
    description: 'Contenu du message',
    example: 'Bonjour, comment allez-vous ?',
  })
  @IsString()
  @IsNotEmpty()
  messageContent: string;
}
