/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserStore } from '@/store/UserStore';
import { env } from '@/utils/constants';
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
    const token = useUserStore.getState().accessToken;

    if (!token) {
      return Promise.reject(data?.meta || data || error);
    }

    if (token) isRefreshPending = false;

    return request(originalRequest);
  }

  return Promise.reject(data?.meta || data || error);
};

request.interceptors.response.use(handleSuccess, handleError);

request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = useUserStore.getState().accessToken;

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);
