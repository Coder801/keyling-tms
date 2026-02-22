import { ApiProperty } from '@nestjs/swagger';

export class CreateVersionDto {
  @ApiProperty({ example: 'v1.3' })
  name: string;
}
