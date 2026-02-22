import { PartialType } from '@nestjs/mapped-types';
import { CreateTranslationsHistoryDto } from './create-translations-history.dto';

export class UpdateTranslationsHistoryDto extends PartialType(CreateTranslationsHistoryDto) {}
