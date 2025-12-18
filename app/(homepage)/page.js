import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute top-0 -z-10 h-full w-full bg-zinc-950">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-cyan-500/20 opacity-50 blur-[80px]"></div>
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Selamat Datang di <span className="text-cyan-400">CEG</span>
      </h1>

      <p className="mt-6 text-lg leading-8 text-zinc-300 max-w-2xl">
        <i>Chemical Engineering Games</i> atau CEG merupakan ajang perlombaan
        tahunan yang diselenggarakan oleh program studi Teknik Kimia Fakultas
        Teknik Universitas Surabaya, yang ditujukan untuk seluruh siswa-siswi
        SMA/SMK/MA Sederajat se-Indonesia. CEG merupakan perlombaan teknik kimia
        yang dikemas dalam <i>games-games</i> seru yang dapat mengasah kemampuan
        berpikir peserta dan memperkenalkan jurusan Teknik Kimia Universitas
        Surabaya.
      </p>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button asChild className="bg-cyan-500 hover:bg-cyan-600">
          <Link href="/pre-event">Mulai Sekarang</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="text-white hover:text-cyan-400"
        >
          <Link href="/faq">
            FAQ <span aria-hidden="true">→</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
