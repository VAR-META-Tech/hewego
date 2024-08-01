import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

export type IConnectWalletStore = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
};

const useBaseConnectWallet = create<IConnectWalletStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onOpenChange: () => set({ isOpen: false }),
}));

export const useConnectWallet = createSelectorFunctions(useBaseConnectWallet);
