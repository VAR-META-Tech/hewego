import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IBondRepayStore = {
  bondRepayId: string;
  setBondRepayId: (value: string) => void;
};

const useBaseBondRepayStore = create<IBondRepayStore>((set) => ({
  bondRepayId: '',
  setBondRepayId: (value: string) => set({ bondRepayId: value }),
}));

export const useBondRepayStore = createSelectorFunctions(useBaseBondRepayStore);
