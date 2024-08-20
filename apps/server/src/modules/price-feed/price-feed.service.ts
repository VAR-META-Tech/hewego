import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ContractService } from 'modules/contract/contract.service';
import { TokenService } from 'modules/token/token.service';
import { PriceFeedParamsDto } from './dto/latestTokenPriceParams.dto';
import { PriceFeedItemResponseDto } from './dto/priceFeedItemResponse.dto';

@Injectable()
export class PriceFeedService {
  private logger = new Logger(PriceFeedService.name);
  constructor(
    private readonly contractService: ContractService,
    private readonly tokenService: TokenService,
  ) {}
  async collateralAmountCalculation(
    dto: PriceFeedParamsDto,
  ): Promise<PriceFeedItemResponseDto> {
    try {
      const { collateralToken, loanToken, loanAmount } = dto;
      const collateralAmount = await this.contractService.getCollateralAmount(
        loanToken,
        loanAmount,
        collateralToken,
      );
      return new PriceFeedItemResponseDto(collateralAmount);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error);
    }
  }
}
