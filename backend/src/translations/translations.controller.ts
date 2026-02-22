import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { TranslationsService } from './translations.service';
import { CreateTranslationsDto } from './dto/create-translation.dto';
import { UpdateTranslationsDto } from './dto/update-translation.dto';

@ApiTags('translations')
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all translations' })
  @ApiQuery({ name: 'version', required: false, example: 'v1.2' })
  @ApiQuery({ name: 'language', required: false, example: 'EN' })
  @ApiOkResponse({ description: 'List of translations' })
  findAll(
    @Query('version') version?: string,
    @Query('language') language?: string,
  ) {
    return this.translationsService.findAll({ version, language });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get translation by ID' })
  @ApiParam({ name: 'id', description: 'Translation UUID' })
  @ApiOkResponse({ description: 'Translation found' })
  findOne(@Param('id') id: string) {
    return this.translationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new translation' })
  @ApiCreatedResponse({ description: 'Translation created' })
  create(@Body() createTranslationDto: CreateTranslationsDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update translation value' })
  @ApiParam({ name: 'id', description: 'Translation UUID' })
  @ApiOkResponse({ description: 'Translation updated' })
  update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationsDto,
  ) {
    return this.translationsService.update(id, updateTranslationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete translation' })
  @ApiParam({ name: 'id', description: 'Translation UUID' })
  @ApiOkResponse({ description: 'Translation deleted' })
  remove(@Param('id') id: string) {
    return this.translationsService.remove(id);
  }
}
