import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IBondHoldingsStore = {
  bondDetailId: string;
  setBondDetailId: (value: string) => void;
};

const useBaseBondHoldingsStore = create<IBondHoldingsStore>((set) => ({
  bondDetailId: '',
  setBondDetailId: (value: string) => set({ bondDetailId: value }),
}));

export const useBondHoldingsStore = createSelectorFunctions(useBaseBondHoldingsStore);
