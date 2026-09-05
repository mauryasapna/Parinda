import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  devIndicators: false
};

export default nextConfig;
