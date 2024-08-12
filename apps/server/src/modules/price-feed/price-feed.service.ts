import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ContractService } from 'modules/contract/contract.service';
import { TokenService } from 'modules/token/token.service';
import { TokenTypeEnum } from 'shared/enum';
import { PriceFeedParamsDto } from './dto/latestTokenPriceParams.dto';
import { PriceFeedResponseDto } from './dto/priceFeedItemResponse.dto';

@Injectable()
export class PriceFeedService {
  private logger = new Logger(PriceFeedService.name);
  constructor(
    private readonly contractService: ContractService,
    private readonly tokenService: TokenService,
  ) {}
  async getLatestPriceFeed(
    dto: PriceFeedParamsDto,
  ): Promise<PriceFeedResponseDto> {
    try {
      const { collateralAmount, loanAmount } = dto;
      const [collateralToken, loanToken] = await Promise.all([
        this.tokenService.getTokenByType(TokenTypeEnum.COLLATERAL),
        this.tokenService.getTokenByType(TokenTypeEnum.LOAN),
      ]);

      this.logger.debug(
        `collateralToken: ${collateralToken} || loanToken: ${loanToken}`,
      );

      const latestPriceFromOnchain = await this.contractService.getLatestPrice(
        loanToken,
        collateralToken,
      );

      const collateralAmountRatio =
        latestPriceFromOnchain?.collateralPrice * collateralAmount;
      const loanAmountRatio = latestPriceFromOnchain?.loanPrice * loanAmount;

      return new PriceFeedResponseDto(collateralAmountRatio, loanAmountRatio);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(error);
    }
  }
}
