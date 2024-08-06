import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IIssueBondStore = {
  isOpenModal: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
};

const useBaseIssueBondStore = create<IIssueBondStore>((set) => ({
  isOpenModal: false,
  onOpenModal: () => set({ isOpenModal: true }),
  onCloseModal: () => set({ isOpenModal: false }),
}));

export const useIssueBondStore = createSelectorFunctions(useBaseIssueBondStore);
