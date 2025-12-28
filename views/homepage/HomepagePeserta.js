import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function HomepagePeserta() {
    return (
        /* KUNCI UTAMA: 
           - h-screen & overflow-y-auto: Membuat container seukuran layar yang bisa di-scroll.
           - snap-y snap-mandatory: Mengaktifkan fitur magnet scroll vertikal.
        */
        <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
            
            {/* --- SECTION 1: HOME --- */}
            <section className="relative h-screen w-full flex flex-col items-center justify-start snap-start shrink-0">
                {/* Background Section 1 */}
                <div className="absolute inset-0 -z-10">
                    <Image 
                        src="/Asset/Background Landscape.png" 
                        alt="Background CEG" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>

                {/* pt-32 membuat konten turun agar tidak tertutup navbar */}
                <div className="flex flex-col items-center text-center px-4 pt-32">
                    
                    {/* Gambar Banner (Dikecilkan ke max-w-2xl sesuai request) */}
                    <div className="relative w-full max-w-2xl h-[150px] md:h-[220px] mb-6 animate-in fade-in zoom-in duration-700">
                        <Image
                            src="/Asset/CEG HOMEPAGE.png"
                            alt="Chemical Engineering Games 2026"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>

                    {/* Panel Deskripsi */}
                    <div className="max-w-3xl bg-white/30 backdrop-blur-lg border border-white/40 rounded-[40px] p-6 md:p-8 shadow-2xl mb-8">
                        <p className="text-base md:text-lg font-medium leading-relaxed text-teal-950">
                            Chemical Engineering Games atau CEG merupakan ajang perlombaan
                            tahunan yang diselenggarakan oleh program studi Teknik Kimia Fakultas
                            Teknik Universitas Surabaya, yang ditujukan untuk seluruh siswa-siswi
                            SMA/SMK/MA Sederajat se-Indonesia.
                        </p>
                    </div>

                    {/* Tombol Navigasi - Link diubah ke ID agar bisa scroll otomatis */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button 
                            asChild 
                            className="bg-teal-800 hover:bg-teal-900 text-white px-8 py-6 rounded-full text-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            <Link href="#pre-event">Daftar Sekarang</Link>
                        </Button>
                        
                        <Button
                            asChild
                            variant="ghost"
                            className="bg-[#a397c0]/80 hover:bg-[#a397c0] text-teal-950 px-8 py-6 rounded-full text-lg font-bold shadow-lg transition-transform hover:scale-105 backdrop-blur-sm"
                        >
                            <Link href="#faq">
                                Lainnya <span className="ml-2">→</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: PRE-EVENT --- */}
            <section id="pre-event" className="relative h-screen w-full flex flex-col items-center justify-center snap-start shrink-0 bg-[#f0f4f4]">
                <div className="text-center px-6">
                    <h2 className="text-4xl font-black text-teal-900 mb-8 uppercase tracking-widest">Pre-Event Activities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Placeholder Card untuk Pre-Event */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white/50 backdrop-blur-sm p-8 rounded-[30px] border border-teal-200 shadow-xl">
                                <div className="w-full h-32 bg-teal-100 rounded-2xl mb-4 flex items-center justify-center">
                                    <span className="text-teal-800 font-bold">Image {item}</span>
                                </div>
                                <h3 className="text-xl font-bold text-teal-900">Coming Soon</h3>
                                <p className="text-teal-800 mt-2 text-sm">Nantikan keseruan rangkaian acara CEG 2026 di sini.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: FAQ --- */}
            <section id="faq" className="relative h-screen w-full flex flex-col items-center justify-center snap-start shrink-0 bg-white">
                <div className="max-w-4xl w-full px-6">
                    <h2 className="text-4xl font-black text-teal-900 mb-10 text-center uppercase tracking-widest">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 shadow-sm">
                            <p className="font-bold text-teal-950 text-lg">1) Siapa saja yang boleh ikut CEG?</p>
                            <p className="text-teal-800 mt-2">Seluruh siswa-siswi SMA/SMK/MA sederajat di seluruh Indonesia.</p>
                        </div>
                        <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 shadow-sm">
                            <p className="font-bold text-teal-950 text-lg">2) Bagaimana cara pendaftarannya?</p>
                            <p className="text-teal-800 mt-2">Pendaftaran dapat dilakukan secara online melalui tombol "Daftar Sekarang" di atas.</p>
                        </div>
                        <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 shadow-sm">
                            <p className="font-bold text-teal-950 text-lg">3) Di mana lokasi perlombaan?</p>
                            <p className="text-teal-800 mt-2">Perlombaan akan dilaksanakan di Kampus Universitas Surabaya (UBARA).</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}