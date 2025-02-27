import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'], // Tambahkan hostname 'localhost'
},
};

export default nextConfig;




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
