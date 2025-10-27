import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterTokenDto {
  @ApiProperty({ description: 'FCM Token du device', example: 'dXq7K8...' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'Type de device', example: 'android', required: false })
  @IsOptional()
  @IsString()
  deviceType?: string;

  @ApiProperty({ description: 'ID unique du device', required: false })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiProperty({ description: 'Topics FCM', type: [String], required: false })
  @IsOptional()
  @IsArray()
  topics?: string[];
}
