import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IConnectWalletStore = {
  isOpen: boolean;
  isAbleClose: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  setIsAbleClose: (isAbleClose: boolean) => void;
};

const useBaseConnectWalletStore = create<IConnectWalletStore>((set) => ({
  isOpen: false,
  isAbleClose: true,
  onOpen: () => set({ isOpen: true }),
  onOpenChange: () => set({ isOpen: false }),
  setIsAbleClose: (isAbleClose: boolean) => set({ isAbleClose }),
}));

export const useConnectWalletStore = createSelectorFunctions(useBaseConnectWalletStore);
