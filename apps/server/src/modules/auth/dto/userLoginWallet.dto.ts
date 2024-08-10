import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserLoginWalletDto {
  @ApiProperty({ minLength: 6, required: true })
  @IsNotEmpty()
  @IsString()
  wallet: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  accountId?: string;
}
