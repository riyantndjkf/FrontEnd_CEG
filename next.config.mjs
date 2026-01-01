/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // Pastikan ini false atau hapus bagian turbo jika ada
  },
  images: {
    // TAMBAHKAN BARIS INI:
    // Ini memerintahkan Next.js untuk menampilkan gambar apa adanya
    // tanpa mencoba memprosesnya di server (bypass error localhost).
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "http",
        hostname: "api.cegubaya.com",
        port: "5000",
        pathname: "/public/**",
      },
    ],
  },
};

export default nextConfig;