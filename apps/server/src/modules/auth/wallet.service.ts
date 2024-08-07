import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../../database/entities';
import Web3 from 'web3';
import { UserLoginWalletDto } from './dto/userLoginWallet.dto';
import { ApiConfigService } from 'shared/services/api-config.service';
import { UserService } from 'modules/user/user.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly configService: ApiConfigService,

    private readonly userService: UserService,
  ) {}

  async loginByWallet(
    dto: UserLoginWalletDto,
    nonce: number,
    existingUser?: User,
  ): Promise<User> {
    const { wallet } = dto;

    if (existingUser) {
      existingUser.nonce = nonce;
      await this.userService.updateNoneUser({
        walletAddress: wallet,
        nonce,
      });
      return existingUser;
    }

    const newUser = this.userService.createNewUser({
      walletAddress: wallet,
      nonce,
    });
    return newUser;
  }

  private getSignMessage(nonce: number): string {
    const baseMessage = this.configService.authConfig.signatureMessage;
    return nonce === 0 ? baseMessage : `${baseMessage} Nonce: ${nonce}`;
  }

  async validateSignature(
    dto: UserLoginWalletDto,
    nonce: number,
  ): Promise<void> {
    const web3 = new Web3();
    const signMessage = this.getSignMessage(nonce);
    const recoveredWallet = web3.eth.accounts.recover(
      signMessage,
      dto.signature,
    );

    if (!recoveredWallet || recoveredWallet !== dto.wallet) {
      throw new BadRequestException('Invalid signature');
    }
  }

  async getNonce(walletAddress: string): Promise<number> {
    const user = await this.userService.getUserByWallet(walletAddress);
    if (!user) {
      return -1;
    }
    const newNonce = user.nonce + 1;
    await this.userService.updateNoneUser({
      walletAddress,
      nonce: newNonce,
    });
    return newNonce;
  }
}
