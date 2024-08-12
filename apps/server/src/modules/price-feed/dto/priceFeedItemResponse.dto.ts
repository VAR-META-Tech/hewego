export class PriceFeedResponseDto {
  collateralPrice: number;
  loanPrice: number;
  constructor(collateralPrice: number, loanPrice: number) {
    this.collateralPrice = collateralPrice;
    this.loanPrice = loanPrice;
  }
}
