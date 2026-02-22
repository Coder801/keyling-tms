import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsHistoryController } from './translations-history.controller';
import { TranslationsHistoryService } from './translations-history.service';

describe('TranslationsHistoryController', () => {
  let controller: TranslationsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationsHistoryController],
      providers: [TranslationsHistoryService],
    }).compile();

    controller = module.get<TranslationsHistoryController>(TranslationsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
