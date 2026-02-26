import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty({ example: 'English' })
  name: string;

  @ApiProperty({ example: 'EN' })
  code: string;

  @ApiProperty({ example: '🇬🇧', required: false })
  flag?: string;
}
