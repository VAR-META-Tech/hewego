import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IBondClaimStore = {
  bondClaimId: string;
  setBondClaimId: (value: string) => void;
};

const useBaseBondClaimStore = create<IBondClaimStore>((set) => ({
  bondClaimId: '',
  setBondClaimId: (value: string) => set({ bondClaimId: value }),
}));

export const useBondClaimStore = createSelectorFunctions(useBaseBondClaimStore);
