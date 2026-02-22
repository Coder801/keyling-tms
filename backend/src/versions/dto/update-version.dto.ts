import { ApiProperty } from '@nestjs/swagger';

export class UpdateVersionDto {
  @ApiProperty({ example: 'published', enum: ['draft', 'published'] })
  status?: string;
}
