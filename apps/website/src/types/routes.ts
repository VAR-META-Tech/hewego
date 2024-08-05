export const ROUTE = {
  HOME: '/',
  BONDS: '/bonds',
  CREATE_BOND: '/bonds/create',
  PORTFOLIO: '/portfolio',
} as const;

export type ROUTE_KEY = keyof typeof ROUTE;

export const MAPPING_ROUTE_TITLE = {} as unknown as Record<ROUTE_KEY, string>;
