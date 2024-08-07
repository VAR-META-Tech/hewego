export const ROUTE = {
  HOME: '/',
  BONDS: '/bonds',
  ISSUE_BOND: '/issue-bond',
  MY_PORTFOLIO: '/my-portfolio',
  BUY_BOND: '/buy-bond/:id',
} as const;

export type ROUTE_KEY = keyof typeof ROUTE;

export const MAPPING_ROUTE_TITLE = {} as unknown as Record<ROUTE_KEY, string>;
