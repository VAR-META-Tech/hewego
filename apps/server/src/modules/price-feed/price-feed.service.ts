import { Injectable } from '@nestjs/common';
import { ContractService } from 'modules/contract/contract.service';

@Injectable()
export class PriceFeedService {
  constructor(private readonly contractService: ContractService) {}
  async getLatestPrice(tokenA: string, tokenB: string) {
    const result = await this.contractService.getLatestPrice(tokenA, tokenB);
    return result;
  }
}
