import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IBondRequestStore = {
  isOpen: boolean;
  isAbleClose: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  setIsAbleClose: (isAbleClose: boolean) => void;
};

const useBaseBondRequestStore = create<IBondRequestStore>((set) => ({
  isOpen: false,
  isAbleClose: true,
  onOpen: () => set({ isOpen: true }),
  onOpenChange: () => set({ isOpen: false }),
  setIsAbleClose: (isAbleClose: boolean) => set({ isAbleClose }),
}));

export const useBondRequestStore = createSelectorFunctions(useBaseBondRequestStore);
