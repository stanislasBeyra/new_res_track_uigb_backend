import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { SenderType, ReceiverType } from '../entities/message.entity';

export class CreateMessageDto {
  @ApiPropertyOptional({
    description: 'Recipient ID (for private message)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  receiverId?: number;

  @ApiPropertyOptional({
    description: 'Recipient type (optional - will be automatically retrieved from database if not provided)',
    enum: ReceiverType,
    example: ReceiverType.STUDENT,
  })
  @IsOptional()
  @IsEnum(ReceiverType)
  receiverType?: ReceiverType;

  @ApiPropertyOptional({
    description: 'Group ID (for group message)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  groupId?: number;

  @ApiProperty({
    description: 'Message content',
    example: 'Hello, how are you?',
  })
  @IsString()
  @IsNotEmpty()
  messageContent: string;
}
