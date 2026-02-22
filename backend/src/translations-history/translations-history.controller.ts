import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranslationsHistoryService } from './translations-history.service';
import { CreateTranslationsHistoryDto } from './dto/create-translations-history.dto';
import { UpdateTranslationsHistoryDto } from './dto/update-translations-history.dto';

@Controller('translations-history')
export class TranslationsHistoryController {
  constructor(private readonly translationsHistoryService: TranslationsHistoryService) {}

  @Post()
  create(@Body() createTranslationsHistoryDto: CreateTranslationsHistoryDto) {
    return this.translationsHistoryService.create(createTranslationsHistoryDto);
  }

  @Get()
  findAll() {
    return this.translationsHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationsHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslationsHistoryDto: UpdateTranslationsHistoryDto) {
    return this.translationsHistoryService.update(+id, updateTranslationsHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationsHistoryService.remove(+id);
  }
}
