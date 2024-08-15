import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IBondCancelStore = {
  bondCancelId: string;
  setBondCancelId: (value: string) => void;
};

const useBaseBondCancelStore = create<IBondCancelStore>((set) => ({
  bondCancelId: '',
  setBondCancelId: (value: string) => set({ bondCancelId: value }),
}));

export const useBondCancelStore = createSelectorFunctions(useBaseBondCancelStore);
