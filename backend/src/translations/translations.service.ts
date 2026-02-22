import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTranslationsDto } from './dto/create-translation.dto';
import { UpdateTranslationsDto } from './dto/update-translation.dto';
import {
  TranslationsResponse,
  TranslationsFilters,
} from './types/translations.types';

const toResponse = (t: {
  id: string;
  key: string;
  value: string;
  language: string;
  version: string;
  updatedAt: Date;
}): TranslationsResponse => ({
  id: t.id,
  key: t.key,
  value: t.value,
  language: t.language,
  version: t.version,
  status: t.value ? 'translated' : 'missing',
  lastUpdated: t.updatedAt.toISOString(),
});

@Injectable()
export class TranslationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: TranslationsFilters): Promise<TranslationsResponse[]> {
    const translations = await this.prisma.translations.findMany({
      where: {
        ...(filters.version && { version: filters.version }),
        ...(filters.language && { language: filters.language }),
      },
      orderBy: { key: 'asc' },
    });

    return translations.map(toResponse);
  }

  async findOne(id: string): Promise<TranslationsResponse> {
    const t = await this.prisma.translations.findUniqueOrThrow({
      where: { id },
    });
    return toResponse(t);
  }

  async create(dto: CreateTranslationsDto): Promise<TranslationsResponse> {
    const t = await this.prisma.translations.create({
      data: {
        key: dto.key,
        value: dto.value,
        language: dto.language,
        version: dto.version,
      },
    });
    return toResponse(t);
  }

  async update(
    id: string,
    dto: UpdateTranslationsDto,
  ): Promise<TranslationsResponse> {
    const existing = await this.prisma.translations.findUniqueOrThrow({
      where: { id },
    });

    const updated = await this.prisma.translations.update({
      where: { id },
      data: { value: dto.value },
    });

    await this.prisma.translationHistory.create({
      data: {
        translationId: id,
        oldValue: existing.value,
        editedBy: dto.editedBy,
      },
    });

    return toResponse(updated);
  }

  async remove(id: string): Promise<{ id: string }> {
    const deleted = await this.prisma.translations.delete({ where: { id } });
    return { id: deleted.id };
  }
}
