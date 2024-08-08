/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/utils/constants';
import { getCookies, removeCookies } from '@/utils/cookies';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

let isRefreshPending = false;

export const request = axios.create({
  baseURL: env.API_URL,
  withCredentials: false,
});

const onRefreshToken = async () => {
  const refreshToken = getCookies('refresh_token');
  if (refreshToken) {
    try {
      return null;
    } catch (e) {
      removeCookies('access_token');
      removeCookies('refresh_token');
    }
  } else {
    removeCookies('access_token');
    removeCookies('refresh_token');
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
    const accessToken = getCookies('access_token');

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);
