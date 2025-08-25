import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'www.sdcampus.com',
      'static.sdcampus.com',
      'd1mbj426mo5twu.cloudfront.net',
      'www.youtube.com',
      'storage-upschindi.s3.ap-south-1.amazonaws.com'
    ],
  },

  async headers() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};


export default nextConfig;
