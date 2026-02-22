import { Module } from '@nestjs/common';
import { TranslationsHistoryService } from './translations-history.service';
import { TranslationsHistoryController } from './translations-history.controller';

@Module({
  controllers: [TranslationsHistoryController],
  providers: [TranslationsHistoryService],
})
export class TranslationsHistoryModule {}
