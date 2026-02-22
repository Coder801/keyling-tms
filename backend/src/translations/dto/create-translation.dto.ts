import { ApiProperty } from '@nestjs/swagger';

export class CreateTranslationsDto {
  @ApiProperty({ example: 'login_title' })
  key: string;

  @ApiProperty({ example: 'Welcome Back' })
  value: string;

  @ApiProperty({ example: 'EN' })
  language: string;

  @ApiProperty({ example: 'v1.2' })
  version: string;
}
