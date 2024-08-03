import { Test, TestingModule } from '@nestjs/testing';
import { CoalitionService } from './coalition.service';

describe('CoalitionService', () => {
  let service: CoalitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoalitionService],
    }).compile();

    service = module.get<CoalitionService>(CoalitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
