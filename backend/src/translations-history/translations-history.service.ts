import { Injectable } from '@nestjs/common';
import { CreateTranslationsHistoryDto } from './dto/create-translations-history.dto';
import { UpdateTranslationsHistoryDto } from './dto/update-translations-history.dto';

@Injectable()
export class TranslationsHistoryService {
  create(createTranslationsHistoryDto: CreateTranslationsHistoryDto) {
    return 'This action adds a new translationsHistory';
  }

  findAll() {
    return `This action returns all translationsHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translationsHistory`;
  }

  update(id: number, updateTranslationsHistoryDto: UpdateTranslationsHistoryDto) {
    return `This action updates a #${id} translationsHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} translationsHistory`;
  }
}
