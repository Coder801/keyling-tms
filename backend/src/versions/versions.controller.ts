import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { VersionsService } from './versions.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

@ApiTags('versions')
@Controller('versions')
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all versions' })
  findAll() {
    return this.versionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get version by id' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.versionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new version' })
  create(@Body() createVersionDto: CreateVersionDto) {
    return this.versionsService.create(createVersionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update version (e.g. publish)' })
  @ApiParam({ name: 'id', type: String })
  update(@Param('id') id: string, @Body() updateVersionDto: UpdateVersionDto) {
    return this.versionsService.update(id, updateVersionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete version' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.versionsService.remove(id);
  }
}
