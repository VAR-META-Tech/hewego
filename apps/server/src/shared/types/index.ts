export type TokensType = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // in milliseconds
};

export type JwtPayloadType = {
  session: string;
  userId: number;
  iat: number;
  exp: number;
};
