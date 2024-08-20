/* eslint-disable @typescript-eslint/no-explicit-any */
import { destroyCookie, parseCookies, setCookie } from 'nookies';

export const getCookies = (key: string) => {
  const cookie = parseCookies();
  return cookie[key];
};

export const setCookies = (key: string, value: any) => {
  setCookie(null, key, value, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};

export const removeCookies = (key: string) => {
  destroyCookie(null, key, {
    path: '/',
  });
};

export const COOKIES = {
  token: 'token',
  user: 'profile',
  theme: 'theme',
  language: 'language',
  currency: 'currency',
};
