import { Test, TestingModule } from '@nestjs/testing';
import { BondController } from './bond.controller';

describe('BondController', () => {
  let controller: BondController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BondController],
    }).compile();

    controller = module.get<BondController>(BondController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
