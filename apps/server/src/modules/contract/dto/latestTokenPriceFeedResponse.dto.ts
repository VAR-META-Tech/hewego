export class LatestTokenPriceFeedResponseDto {
  loanPrice: number;
  collateralPrice: number;
  constructor(loanPrice: number, collateralPrice: number) {
    this.loanPrice = loanPrice;
    this.collateralPrice = collateralPrice;
  }
}
