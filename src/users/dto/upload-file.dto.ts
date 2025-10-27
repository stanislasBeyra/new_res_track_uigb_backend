import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file (JPG, JPEG, PNG, GIF) - Max 5MB',
  })
  file: any;
}
