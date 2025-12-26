import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function HomepagePeserta() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* 1. Background Image - Ganti path sesuai letak file gambar backgroundmu */}
            <div className="absolute inset-0 -z-10">
                <Image 
                    src="/Asset/Background Landscape.png" 
                    alt="Background CEG" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>

            {/* 2. Judul Utama dengan Gaya Desain CEG */}
            <div className="relative mb-8 mt-20">
                <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase">
                    <span className="block drop-shadow-[2px_2px_0px_#1e3a3a]">CHEMICAL</span>
                    <span className="block -mt-2 md:-mt-4 drop-shadow-[2px_2px_0px_#1e3a3a]">ENGINEERING</span>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-1 w-12 md:w-20 bg-teal-900 mt-4"></div>
                        <span className="text-4xl md:text-6xl text-white">GAMES 2026</span>
                        <div className="h-1 w-12 md:w-20 bg-teal-900 mt-4"></div>
                    </div>
                </h1>
            </div>

            {/* 3. Panel Deskripsi dengan Efek Glassmorphism */}
            <div className="max-w-4xl bg-white/30 backdrop-blur-md border border-white/40 rounded-[40px] p-8 md:p-12 shadow-xl mb-10">
                <p className="text-lg md:text-xl font-medium leading-relaxed text-teal-950">
                    Chemical Engineering Games atau CEG merupakan ajang perlombaan
                    tahunan yang diselenggarakan oleh program studi Teknik Kimia Fakultas
                    Teknik Universitas Surabaya, yang ditujukan untuk seluruh siswa-siswi
                    SMA/SMK/MA Sederajat se-Indonesia. CEG merupakan perlombaan teknik kimia
                    yang dikemas dalam <span className="italic font-bold">games-games</span> seru yang dapat mengasah kemampuan
                    berpikir peserta dan memperkenalkan jurusan Teknik Kimia Universitas
                    Surabaya.
                </p>
            </div>

            {/* 4. Button dengan Gaya Rounded Desain Baru */}
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
    )
}