// Perhatikan path import di bawah ini sudah disesuaikan
import Navbar from "@/components/shared/Dashboard/Navbar/navbar";
import "./globals.css";

export const metadata = {
  title: "Brand Website",
  description: "Website keren buatan Riyan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-zinc-950 text-white antialiased">
        {/* Navbar dipanggil dari folder Dashboard */}
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
