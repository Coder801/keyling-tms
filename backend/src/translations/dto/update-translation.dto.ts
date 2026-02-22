import { ApiProperty } from '@nestjs/swagger';

export class UpdateTranslationsDto {
  @ApiProperty({ example: 'Welcome Back' })
  value: string;

  @ApiProperty({ example: 'admin' })
  editedBy: string;
}
