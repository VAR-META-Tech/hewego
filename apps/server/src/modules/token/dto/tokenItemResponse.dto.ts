import { ApiProperty } from '@nestjs/swagger';
import { TokenSymbolEnum, TokenTypeEnum } from '../../../shared/enum';

export class TokenItemResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the token.',
  })
  id: number;

  @ApiProperty({
    enum: TokenSymbolEnum,
    description: 'The symbol of the token.',
    nullable: true,
  })
  symbol: TokenSymbolEnum;

  @ApiProperty({
    enum: TokenTypeEnum,
    description: 'The type of the token.',
    nullable: true,
  })
  type: TokenTypeEnum;

  @ApiProperty({
    example: '0x1234abcd...',
    description: 'The address of the token.',
    nullable: true,
  })
  address: number;

  @ApiProperty({
    example: '2024-08-09T12:34:56Z',
    description: 'The date and time when the token was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-09T12:34:56Z',
    description: 'The date and time when the token was last updated.',
  })
  updatedAt: Date;
}
