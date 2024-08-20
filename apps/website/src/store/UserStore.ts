import { ILoginUserData } from '@/api/auth/type';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IMeQueryStore {
  status: 'waiting' | 'ready';
  user: ILoginUserData;
  accessToken: string;
  refreshToken: string;
  setUser: (data: ILoginUserData) => void;
  setAccessToken: (data: string) => void;
  setRefreshToken: (data: string) => void;
  logout: () => void;
}

const useBaseUserStore = create<IMeQueryStore>()(
  persist(
    (set) => ({
      status: 'waiting',
      accessToken: '',
      refreshToken: '',
      user: {} as ILoginUserData,
      setUser: (data) => set((state) => ({ ...state, user: data })),
      setAccessToken: (data) => set((state) => ({ ...state, accessToken: data })),
      setRefreshToken: (data) => set((state) => ({ ...state, refreshToken: data })),
      logout: () =>
        set(() => ({
          accessToken: '',
          refreshToken: '',
          user: {} as ILoginUserData,
          wallet: {} as string,
        })),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.status = 'ready';
      },
    }
  )
);

export const useUserStore = createSelectorFunctions(useBaseUserStore);