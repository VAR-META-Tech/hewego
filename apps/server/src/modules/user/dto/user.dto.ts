import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({
    description: "User's wallet address",
    example: '0x123456789abcdef',
  })
  walletAddress: string;

  @ApiProperty({ description: 'User nonce', example: 123456 })
  nonce: number;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-08-07T12:34:56Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last updated date',
    example: '2023-08-08T12:34:56Z',
  })
  updatedAt: Date;
}
