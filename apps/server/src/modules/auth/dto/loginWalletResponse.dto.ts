import { BaseResponse } from 'common/dto/baseResponse.dto';
import { LoginWalletDto } from './loginWallet.dto';

export class LoginWalletResponseDto extends BaseResponse {
  data: LoginWalletDto;
}
