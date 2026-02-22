import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { VersionResponse } from './types/versions.types';

const toResponse = (v: {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
}): VersionResponse => ({
  id: v.id,
  name: v.name,
  status: v.status as 'draft' | 'published',
  createdDate: v.createdAt.toISOString().split('T')[0],
});

@Injectable()
export class VersionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<VersionResponse[]> {
    const versions = await this.prisma.version.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return versions.map(toResponse);
  }

  async findOne(id: string): Promise<VersionResponse> {
    const version = await this.prisma.version.findUniqueOrThrow({
      where: { id },
    });
    return toResponse(version);
  }

  async create(dto: CreateVersionDto): Promise<VersionResponse> {
    const version = await this.prisma.version.create({
      data: { name: dto.name, status: 'draft' },
    });
    return toResponse(version);
  }

  async update(id: string, dto: UpdateVersionDto): Promise<VersionResponse> {
    const version = await this.prisma.version.update({
      where: { id },
      data: { ...(dto.status && { status: dto.status }) },
    });
    return toResponse(version);
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.prisma.version.delete({ where: { id } });
    return { id };
  }
}
