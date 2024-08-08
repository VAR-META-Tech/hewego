import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginWalletDto {
  @ApiProperty({ minLength: 6, required: true })
  @IsNotEmpty()
  @IsString()
  wallet: string;
}
