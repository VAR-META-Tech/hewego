import { BigNumber } from '@hashgraph/sdk/lib/Transfer';
import { ApiProperty } from '@nestjs/swagger';

export class PriceFeedItemResponseDto {
  @ApiProperty({ example: 2068039252, type: String })
  collateralPrice: BigNumber;
  constructor(collateralPrice: BigNumber) {
    this.collateralPrice = collateralPrice;
  }
}
