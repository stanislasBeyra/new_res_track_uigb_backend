import { Test, TestingModule } from '@nestjs/testing';
import { ExitsController } from './exits.controller';
import { ExitsService } from './exits.service';

describe('ExitsController', () => {
  let controller: ExitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExitsController],
      providers: [ExitsService],
    }).compile();

    controller = module.get<ExitsController>(ExitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
