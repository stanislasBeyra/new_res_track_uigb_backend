import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class SendFriendRequestDto {
  @ApiProperty({
    description: 'Student ID to add',
    example: 2,
  })
  @IsInt()
  studentId: number;
}
