import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
// Impor Navbar jika berada di file terpisah, atau pastikan pembungkusnya memiliki background putih
import Navbar from '@/components/shared/Dashboard/navbar' 

export default function HomepagePeserta() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden">
            {/* 1. Background Image Utama */}
            <div className="absolute inset-0 -z-10">
                <Image 
                    src="/Asset/Background Landscape.png" 
                    alt="Background CEG" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>

            {/* 2. Navbar tetap di atas dengan background putih transparan */}
            <div className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20">
                <Navbar />
            </div>

            <div className="flex flex-col items-center justify-center flex-grow text-center px-4 pt-10">
                {/* 3. Judul menggunakan Asset Gambar (CEG HOMEPAGE.png) */}
                <div className="relative w-full max-w-4xl h-[200px] md:h-[350px] mb-4 animate-in fade-in zoom-in duration-700">
                    <Image
                        src="/Asset/CEG HOMEPAGE.png"
                        alt="Chemical Engineering Games 2026"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                {/* 4. Panel Deskripsi */}
                <div className="max-w-4xl bg-white/30 backdrop-blur-lg border border-white/40 rounded-[40px] p-8 md:p-10 shadow-2xl mb-10">
                    <p className="text-lg md:text-xl font-medium leading-relaxed text-teal-950">
                        Chemical Engineering Games atau CEG merupakan ajang perlombaan
                        tahunan yang diselenggarakan oleh program studi Teknik Kimia Fakultas
                        Teknik Universitas Surabaya, yang ditujukan untuk seluruh siswa-siswi
                        SMA/SMK/MA Sederajat se-Indonesia.
                    </p>
                </div>

                {/* 5. Tombol Navigasi */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                    <Button 
                        asChild 
                        className="bg-teal-800 hover:bg-teal-900 text-white px-10 py-7 rounded-full text-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                        <Link href="/pre-event">Daftar Sekarang</Link>
                    </Button>
                    
                    <Button
                        asChild
                        variant="ghost"
                        className="bg-[#a397c0]/80 hover:bg-[#a397c0] text-teal-950 px-10 py-7 rounded-full text-xl font-bold shadow-lg transition-transform hover:scale-105 backdrop-blur-sm"
                    >
                        <Link href="/faq">
                            Lainnya <span className="ml-2">→</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}