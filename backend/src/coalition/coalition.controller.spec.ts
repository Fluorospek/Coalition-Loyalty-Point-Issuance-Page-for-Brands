import { Test, TestingModule } from '@nestjs/testing';
import { CoalitionController } from './coalition.controller';
import { CoalitionService } from './coalition.service';

describe('CoalitionController', () => {
  let controller: CoalitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoalitionController],
      providers: [CoalitionService],
    }).compile();

    controller = module.get<CoalitionController>(CoalitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
