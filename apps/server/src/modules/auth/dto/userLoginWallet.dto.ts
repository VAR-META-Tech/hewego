import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsAddress } from '../../../decorators/isAddress.decorator';

export class UserLoginWalletDto {
  @ApiProperty({ minLength: 6, required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsAddress()
  wallet: string;
}
