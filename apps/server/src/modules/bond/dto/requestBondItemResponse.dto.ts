import { ApiProperty } from '@nestjs/swagger';
import { ActiveBondResponseDto } from './activeBondResponse.dto';

export class RequestBondItemResponseDto extends ActiveBondResponseDto {
  @ApiProperty({ example: '', required: false })
  status: string;
}
