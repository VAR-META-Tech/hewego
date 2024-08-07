import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities/User.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByWallet(wallet: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { walletAddress: Equal(wallet) },
    });
  }

  async createNewUser(user: Partial<User>): Promise<User> {
    return await this.userRepository.save(user);
  }
  async updateNoneUser(user: Partial<User>): Promise<void> {
    await this.userRepository.update(
      {
        walletAddress: Equal(user.walletAddress),
      },
      {
        nonce: user.nonce,
      },
    );
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
