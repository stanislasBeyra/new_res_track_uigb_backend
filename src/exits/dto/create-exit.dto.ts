import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateExitDto {
  @ApiProperty({
    description: 'Exit reason',
    example: 'Family visit',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  reason: string;

  @ApiProperty({
    description: 'Destination',
    example: 'Abidjan',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  destination: string;

  @ApiProperty({
    description: 'Departure date and time',
    example: '2025-10-15T10:00:00Z',
    type: String,
  })
  @IsDateString()
  departureDate: string;

  @ApiProperty({
    description: 'Expected return date and time',
    example: '2025-10-20T18:00:00Z',
    type: String,
  })
  @IsDateString()
  expectedReturnDate: string;

  @ApiProperty({
    description: 'Detailed description (optional)',
    example: 'I will visit my family for the weekend',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
