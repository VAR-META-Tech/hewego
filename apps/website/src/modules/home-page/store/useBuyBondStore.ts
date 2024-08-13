import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IBuyBondStore = {
  bondId: string;
  isLoadingTransaction: boolean;
  isLoadingCheckBalance: boolean;
  isEnoughBalance: boolean;
  setIsLoadingTransaction: (value: boolean) => void;
  setIsEnoughBalance: (value: boolean) => void;
  setIsLoadingCheckBalance: (value: boolean) => void;
  setBondId: (value: string) => void;
  clearBondId: () => void;
};

const useBaseBuyBondStore = create<IBuyBondStore>((set) => ({
  bondId: '',
  isLoadingTransaction: false,
  isLoadingCheckBalance: false,
  isEnoughBalance: true,
  setIsLoadingTransaction: (value: boolean) => set({ isLoadingTransaction: value }),
  setIsEnoughBalance: (value: boolean) => set({ isEnoughBalance: value }),
  setIsLoadingCheckBalance: (value: boolean) => set({ isLoadingCheckBalance: value }),
  setBondId: (value: string) => set({ bondId: value }),
  clearBondId: () => set({ bondId: '' }),
}));

export const useBuyBondStore = createSelectorFunctions(useBaseBuyBondStore);
