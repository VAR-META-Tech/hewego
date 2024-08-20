import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

interface IDateRange {
  start: string | Date | undefined;
  end: string | Date | undefined;
}

export type IBondRequestStore = {
  pendingIssuanceDateRange: IDateRange;
  setPendingIssuanceDateRange: (dateRange: IDateRange) => void;
  activeMaturityDateRange: IDateRange;
  setActiveMaturityDateRange: (dateRange: IDateRange) => void;
};

const useBaseBondRequestStore = create<IBondRequestStore>((set) => ({
  pendingIssuanceDateRange: { start: undefined, end: undefined },
  setPendingIssuanceDateRange: (dateRange) => set({ pendingIssuanceDateRange: dateRange }),
  activeMaturityDateRange: { start: undefined, end: undefined },
  setActiveMaturityDateRange: (dateRange) => set({ activeMaturityDateRange: dateRange }),
}));

export const useBondRequestStore = createSelectorFunctions(useBaseBondRequestStore);
