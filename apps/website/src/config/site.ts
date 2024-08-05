import { env } from '@/utils/constants';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Hedera Hackathon',
  description: 'Hedera Hackathon',
  url: env.APP_URL,
  ogImage: 'http://localhost:3000/opengraph-image.jpg',
};
