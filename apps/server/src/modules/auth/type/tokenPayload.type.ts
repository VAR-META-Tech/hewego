import { TokenType } from 'constants/token-type';

export type TokenPayloadType = {
  sub: {
    userId: number;
    type: TokenType;
  };
};
