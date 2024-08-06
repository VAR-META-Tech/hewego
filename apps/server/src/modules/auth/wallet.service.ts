import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities';
import { Equal, Repository } from 'typeorm';
import Web3 from 'web3';
import { WalletValidateDto } from './dto/wallet.validate';

@Injectable()
export class WalletService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async loginByWallet(
    dto: WalletValidateDto,
    nonce: number,
    existingUser?: User,
  ): Promise<User> {
    const { wallet } = dto;

    if (existingUser) {
      existingUser.nonce = nonce;
      await this.userRepository.update(
        { walletAddress: Equal(wallet) },
        { nonce },
      );
      return existingUser;
    }

    const newUser = this.userRepository.create({
      walletAddress: wallet,
      nonce,
    });
    return await this.userRepository.save(newUser);
  }

  getSignMessage(nonce: number): string {
    const baseMessage = this.configService.get<string>(
      'userAuth.signatureMessage',
    );
    return nonce === 0 ? baseMessage : `${baseMessage} Nonce: ${nonce}`;
  }

  async validateSignature(
    dto: WalletValidateDto,
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
    const user = await this.getUserByWallet(walletAddress);
    if (!user) {
      return -1;
    }

    const newNonce = user.nonce + 1;
    await this.userRepository.update(
      { walletAddress: Equal(walletAddress) },
      { nonce: newNonce },
    );
    return newNonce;
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { walletAddress: Equal(walletAddress) },
    });
  }
}
