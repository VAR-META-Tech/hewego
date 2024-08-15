import { Test, TestingModule } from '@nestjs/testing';
import { InternalController } from './internal.controller';

describe('InternalController', () => {
  let controller: InternalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalController],
    }).compile();

    controller = module.get<InternalController>(InternalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
