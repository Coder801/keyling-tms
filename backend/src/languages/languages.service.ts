import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageResponse, LanguageStatus } from './types/languages.types';

const toResponse = (l: {
  id: string;
  code: string;
  name: string;
  flag: string | null;
  status: string;
  createdAt: Date;
}): LanguageResponse => ({
  id: l.id,
  code: l.code,
  name: l.name,
  flag: l.flag,
  status: l.status as LanguageStatus,
  createdAt: l.createdAt.toISOString(),
});

@Injectable()
export class LanguagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<LanguageResponse[]> {
    const languages = await this.prisma.languages.findMany({
      orderBy: { name: 'asc' },
    });
    return languages.map(toResponse);
  }

  async findOne(id: string): Promise<LanguageResponse> {
    const language = await this.prisma.languages.findUniqueOrThrow({
      where: { id },
    });
    return toResponse(language);
  }

  async create(dto: CreateLanguageDto): Promise<LanguageResponse> {
    const language = await this.prisma.languages.create({
      data: {
        name: dto.name,
        code: dto.code.toUpperCase(),
        flag: dto.flag ?? null,
        status: 'draft',
      },
    });
    return toResponse(language);
  }

  async update(id: string, dto: UpdateLanguageDto): Promise<LanguageResponse> {
    const language = await this.prisma.languages.update({
      where: { id },
      data: {
        ...(dto.status && { status: dto.status }),
        ...(dto.flag !== undefined && { flag: dto.flag }),
      },
    });
    return toResponse(language);
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.prisma.languages.delete({ where: { id } });
    return { id };
  }
}
