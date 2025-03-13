/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/profile_picture/**",
      },
    ],
  },
};

module.exports = nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//     images: {
//       domains: ["localhost"],
//       remotePatterns: [
//         {
//           protocol: "http",
//           hostname: "localhost",
//           port: "8000",
//           pathname: "/profile_picture/**",
//         },
//       ],
//     },
//   };
  
//   module.exports = nextConfig;

// export default nextConfig;
