// Perhatikan path import di bawah ini sudah disesuaikan
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Providers from "@/core/store/Providers";

export const metadata = {
  title: "CEG - Chemical Engineering Games",
  description: "Website keren buatan Riyan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-zinc-950 text-white antialiased">
        <Providers>
          <main>{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
