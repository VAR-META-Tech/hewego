import { ApiProperty } from '@nestjs/swagger';

export class FeePlatformItemResponseDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  platformFee: number;
  constructor(platformFee: number) {
    this.platformFee = platformFee;
  }
}
