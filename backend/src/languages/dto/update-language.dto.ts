import { ApiProperty } from '@nestjs/swagger';

export class UpdateLanguageDto {
  @ApiProperty({ example: 'active', enum: ['active', 'draft'], required: false })
  status?: string;

  @ApiProperty({ example: '🇬🇧', required: false })
  flag?: string;
}
