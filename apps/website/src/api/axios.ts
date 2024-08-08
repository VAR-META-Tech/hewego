/* eslint-disable @typescript-eslint/no-explicit-any */
import { COOKIES_KEY, env } from '@/utils/constants';
import { getCookies, removeCookies } from '@/utils/cookies';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

let isRefreshPending = false;

export const request = axios.create({
  baseURL: env.API_URL,
  withCredentials: false,
});

const onRefreshToken = async () => {
  const refreshToken = getCookies(COOKIES_KEY.REFRESH_TOKEN);
  if (refreshToken) {
    try {
      return null;
    } catch (e) {
      removeCookies(COOKIES_KEY.ACCESS_TOKEN);
      removeCookies(COOKIES_KEY.REFRESH_TOKEN);
    }
  } else {
    removeCookies(COOKIES_KEY.ACCESS_TOKEN);
    removeCookies(COOKIES_KEY.REFRESH_TOKEN);
  }

  return null;
};

const handleSuccess = (res: AxiosResponse) => {
  return res;
};

const handleError = async (error: any) => {
  const originalRequest = error.config!;
  const data = error?.response?.data as any;
  if (data?.meta?.code === 401 && data?.meta?.message === 'jwt expired' && !isRefreshPending) {
    isRefreshPending = true;
    const token = await onRefreshToken();
    if (token) isRefreshPending = false;

    return request(originalRequest);
  }

  return Promise.reject(data?.meta || data || error);
};

request.interceptors.response.use(handleSuccess, handleError);

request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookies(COOKIES_KEY.ACCESS_TOKEN);

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);
