import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';

describe('LoyaltyController', () => {
  let controller: LoyaltyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyController],
      providers: [LoyaltyService],
    }).compile();

    controller = module.get<LoyaltyController>(LoyaltyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
