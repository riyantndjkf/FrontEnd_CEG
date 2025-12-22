// Perhatikan path import di bawah ini sudah disesuaikan
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Providers from "@/core/store/Providers";
import Loader from "@/components/shared/Loader";
import { Suspense } from "react";

export const metadata = {
  title: "CEG - Chemical Engineering Games",
  description: "Website keren buatan Riyan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-zinc-950 text-white antialiased">
        <Providers>
          <Suspense fallback={<Loader />}>
            {children}
          </Suspense>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
