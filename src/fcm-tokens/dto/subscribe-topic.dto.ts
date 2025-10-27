import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeTopicDto {
  @ApiProperty({ description: 'Nom du topic', example: 'exits_notifications' })
  @IsString()
  @IsNotEmpty()
  topic: string;
}
