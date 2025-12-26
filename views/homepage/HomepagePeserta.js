import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function HomepagePeserta() {
    return (
        // 1. Menggunakan h-screen dan overflow-hidden agar tidak bisa di-scroll
        <div className="relative h-screen w-full flex flex-col items-center overflow-hidden">
            
            {/* Background Image Utama */}
            <div className="absolute inset-0 -z-10">
                <Image 
                    src="/Asset/Background Landscape.png" 
                    alt="Background CEG" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>

            {/* 2. Menambah pt-32 agar konten turun sedikit dari navbar */}
            <div className="flex flex-col items-center justify-start flex-grow text-center px-4 pt-32">
                
                {/* 3. Mengecilkan gambar: max-w diganti ke 2xl dan tinggi h-[250px] */}
                <div className="relative w-full max-w-2xl h-[150px] md:h-[250px] mb-6 animate-in fade-in zoom-in duration-700">
                    <Image
                        src="/Asset/CEG HOMEPAGE.png"
                        alt="Chemical Engineering Games 2026"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                {/* Panel Deskripsi - Dibuat sedikit lebih ramping */}
                <div className="max-w-3xl bg-white/30 backdrop-blur-lg border border-white/40 rounded-[40px] p-6 md:p-8 shadow-2xl mb-8">
                    <p className="text-base md:text-lg font-medium leading-relaxed text-teal-950">
                        Chemical Engineering Games atau CEG merupakan ajang perlombaan
                        tahunan yang diselenggarakan oleh program studi Teknik Kimia Fakultas
                        Teknik Universitas Surabaya, yang ditujukan untuk seluruh siswa-siswi
                        SMA/SMK/MA Sederajat se-Indonesia.
                    </p>
                </div>

                {/* Tombol Navigasi */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button 
                        asChild 
                        className="bg-teal-800 hover:bg-teal-900 text-white px-8 py-6 rounded-full text-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                        <Link href="/pre-event">Daftar Sekarang</Link>
                    </Button>
                    
                    <Button
                        asChild
                        variant="ghost"
                        className="bg-[#a397c0]/80 hover:bg-[#a397c0] text-teal-950 px-8 py-6 rounded-full text-lg font-bold shadow-lg transition-transform hover:scale-105 backdrop-blur-sm"
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