import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSession } from '../../database/entities/UserSession.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async createUserSession(options: Partial<UserSession>): Promise<UserSession> {
    const { id, user } = options;
    const userId = user?.id;

    const existingUserSession = await this.userSessionRepository
      .createQueryBuilder('userSession')
      .leftJoinAndSelect('userSession.user', 'user')
      .where('userSession.user = :userId OR userSession.id = :id', {
        userId,
        id,
      })
      .getOne();

    if (existingUserSession) {
      await this.deleteUserSession({ id: existingUserSession.id });
      if (id) {
        options.user = existingUserSession.user;
        delete options.id;
      }
    }

    const newUserSession = this.userSessionRepository.create(options);
    return await this.userSessionRepository.save(newUserSession);
  }

  async deleteUserSession(options: Partial<UserSession>): Promise<boolean> {
    const { affected } = await this.userSessionRepository.delete(options);
    return affected > 0;
  }
}
