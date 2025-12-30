/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  images: {
    // TAMBAHKAN BARIS INI:
    // Ini memerintahkan Next.js untuk menampilkan gambar apa adanya 
    // tanpa mencoba memprosesnya di server (bypass error localhost).
    unoptimized: true, 

    remotePatterns: [
      {
        protocol: 'http',
        hostname: '103.163.138.117',
        port: '5000',
        pathname: '/public/**',
      },
    ],
  },
};

export default nextConfig;