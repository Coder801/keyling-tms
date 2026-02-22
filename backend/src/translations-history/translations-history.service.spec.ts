import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsHistoryService } from './translations-history.service';

describe('TranslationsHistoryService', () => {
  let service: TranslationsHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslationsHistoryService],
    }).compile();

    service = module.get<TranslationsHistoryService>(TranslationsHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
