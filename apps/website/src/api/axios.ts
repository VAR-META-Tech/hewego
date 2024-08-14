/* eslint-disable @typescript-eslint/no-explicit-any */
import { COOKIES_KEY, env } from '@/utils/constants';
import { getCookies } from '@/utils/cookies';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let isRefreshPending = false;

export const request = axios.create({
  baseURL: env.API_URL,
  withCredentials: false,
});

const handleSuccess = (res: AxiosResponse) => {
  return res;
};

const handleError = async (error: any) => {
  const originalRequest = error.config!;
  const data = error?.response?.data as any;
  if (data?.meta?.code === 401) {
    isRefreshPending = true;
    const token = getCookies(COOKIES_KEY.ACCESS_TOKEN);

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
