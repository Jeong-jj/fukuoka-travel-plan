import type { NextConfig } from 'next';

const assetPrefix = process.env.PAGES_ASSET_PREFIX ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix,
  trailingSlash: true,
};

export default nextConfig;
