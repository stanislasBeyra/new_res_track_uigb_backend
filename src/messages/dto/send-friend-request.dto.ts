import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class SendFriendRequestDto {
  @ApiProperty({
    description: 'ID de l\'étudiant à ajouter',
    example: 2,
  })
  @IsInt()
  studentId: number;
}
