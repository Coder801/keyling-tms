import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all languages' })
  @ApiOkResponse({ description: 'List of languages' })
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get language by ID' })
  @ApiParam({ name: 'id', description: 'Language UUID' })
  @ApiOkResponse({ description: 'Language found' })
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new language (status: draft)' })
  @ApiCreatedResponse({ description: 'Language created' })
  create(@Body() dto: CreateLanguageDto) {
    return this.languagesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update language status or flag' })
  @ApiParam({ name: 'id', description: 'Language UUID' })
  @ApiOkResponse({ description: 'Language updated' })
  update(@Param('id') id: string, @Body() dto: UpdateLanguageDto) {
    return this.languagesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete language' })
  @ApiParam({ name: 'id', description: 'Language UUID' })
  @ApiOkResponse({ description: 'Language deleted' })
  remove(@Param('id') id: string) {
    return this.languagesService.remove(id);
  }
}
