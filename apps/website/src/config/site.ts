import { env } from '@/utils/constants';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Hedera Hackathon',
  description: 'Hedera Hackathon',
  url: env.APP_URL,
  ogImage: `${env.APP_URL}/opengraph-image.png`,
};
