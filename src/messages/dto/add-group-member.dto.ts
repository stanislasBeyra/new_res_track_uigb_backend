import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum } from 'class-validator';
import { SenderType } from '../entities/message.entity';

export class AddGroupMemberDto {
  @ApiProperty({
    description: 'ID de l\'utilisateur',
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Type d\'utilisateur',
    enum: SenderType,
    example: SenderType.STUDENT,
  })
  @IsEnum(SenderType)
  userType: SenderType;
}
