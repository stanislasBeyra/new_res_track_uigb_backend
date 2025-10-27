import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { GroupType } from '../entities/goup.entity';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Nom du groupe',
    example: 'Étudiants L3 Informatique',
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  groupName: string;

  @ApiProperty({
    description: 'Type de groupe',
    enum: GroupType,
    example: GroupType.STUDENT,
  })
  @IsEnum(GroupType)
  groupType: GroupType;
}
