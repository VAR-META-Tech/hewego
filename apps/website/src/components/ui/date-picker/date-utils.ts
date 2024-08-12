import { differenceInCalendarDays } from 'date-fns';

export function isPastDate(date: Date) {
  return differenceInCalendarDays(date, new Date()) < 0;
}

export const DATE_RANGE_FORMAT = {
  LDY: 'LLL dd, y',
};

export const PRESET_RANGE = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'thisWeek',
  LAST_WEEK: 'lastWeek',
  THIS_MONTH: 'thisMonth',
  LAST_MONTH: 'lastMonth',
  THIS_YEAR: 'thisYear',
  LAST_YEAR: 'lastYear',
};

const generateDateTo = (from: string | Date, to: string | Date | undefined, withDefault: boolean) => {
  if (!withDefault) return undefined;
  if (to) return new Date(new Date(to).setHours(0, 0, 0, 0));

  return new Date(new Date(from).setHours(0, 0, 0, 0));
};

export const getDefaultDateRange = (from: string | Date, to: string | Date | undefined, withDefault: boolean) => {
  const convertedTo = generateDateTo(from, to, withDefault);
  return {
    from: withDefault ? new Date(new Date(from).setHours(0, 0, 0, 0)) : undefined,
    to: convertedTo,
  };
};
