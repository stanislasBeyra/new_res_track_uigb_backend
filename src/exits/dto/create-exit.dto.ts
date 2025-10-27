import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateExitDto {
  @ApiProperty({
    description: 'Raison de la sortie',
    example: 'Visite familiale',
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
    description: 'Date et heure de départ',
    example: '2025-10-15T10:00:00Z',
    type: String,
  })
  @IsDateString()
  departureDate: string;

  @ApiProperty({
    description: 'Date et heure de retour prévue',
    example: '2025-10-20T18:00:00Z',
    type: String,
  })
  @IsDateString()
  expectedReturnDate: string;

  @ApiProperty({
    description: 'Description détaillée (optionnel)',
    example: 'Je vais rendre visite à ma famille pour le weekend',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
