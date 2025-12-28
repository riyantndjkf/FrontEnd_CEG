import { useState } from "react";
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const images = [
  "/Asset/DSC00643.JPG",
  "/Asset/FIO01873.JPG",
  "/Asset/DSC00474.JPG",
];

export default function HomepagePeserta() {

    const [active, setActive] = useState(1);
    const prev = () =>
        setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const next = () =>
        setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    const faqData = [
        {
            id: 1,
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
        },
        {
            id: 2,
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
        },
        {
            id: 3,
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
        },
        {
            id: 4,
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
        }
    ];

    return (
        <div className="relative h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">

            {/* ===== BACKGROUND FIXED ===== */}
            <div className="fixed inset-0 -z-10">
                <Image
                    src="/Asset/Background Landscape.png"
                    alt="Background Landscape"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* ===== SECTION 1: HOME ===== */}
            <section className="h-screen w-full flex flex-col items-center justify-center snap-start px-4">
                <div className="flex flex-col items-center text-center max-w-5xl">
                    <div className="relative w-full max-w-2xl h-[120px] md:h-[180px] mb-4 animate-in fade-in zoom-in duration-700">
                        <Image
                            src="/Asset/CEG HOMEPAGE.png"
                            alt="Chemical Engineering Games 2026"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>

                    <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-[30px] p-6 md:p-8 shadow-2xl mb-6">
                        <p className="text-sm md:text-lg font-medium leading-relaxed text-teal-950 text-justify md:text-center">
                            Chemical Engineering Games atau CEG  merupakan lomba tahunan yang diselenggarakan 
                            oleh Program Studi Teknik Kimia Universitas Surabaya dan ditujukan bagi siswa/i 
                            SMA/sederajat dari seluruh Indonesia. Kegiatan ini dikemas dalam bentuk rangkaian games 
                            yang seru, edukatif, dan unik, sehingga peserta tidak hanya ditantang secara kompetitif, 
                            tetapi juga diajak untuk berpikir kritis, kreatif, dan strategis. Melalui Chemical Engineering Games, 
                            peserta diperkenalkan pada konsep dasar Teknik Kimia dengan cara yang menyenangkan dan 
                            aplikatif, sekaligus melatih kemampuan kerja sama tim, problem solving, serta sportivitas. 
                            Ajang ini diharapkan dapat menumbuhkan minat terhadap dunia sains dan rekayasa, serta mengenal 
                            lebih dekat Program Studi Teknik Kimia Universitas Surabaya.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="bg-teal-800 hover:bg-teal-900 text-white px-8 py-6 rounded-full text-lg font-bold shadow-lg transition-transform hover:scale-105">
                            <Link href="#pre-event">Daftar Sekarang</Link>
                        </Button>
                        <Button asChild variant="ghost" className="bg-[#a397c0]/80 hover:bg-[#a397c0] px-8 py-6 rounded-full text-lg font-bold shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
                            <Link href="#gallery">Lainnya →</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 2: GALLERY & ABOUT ===== */}
            <section
            id="gallery"
            className="w-full flex flex-col items-center snap-start py-6 px-4"
            >
            {/* 1. Gallery Slider */}
            <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
      
        {/* LEFT ARROW */}
        <button
            onClick={prev}
            className="absolute left-0 z-20 bg-white/70 hover:bg-white text-teal-800 rounded-full w-10 h-10 flex items-center justify-center shadow"
        >
            ‹
        </button>

        {/* IMAGES */}
        <div className="flex items-center justify-center gap-6 overflow-hidden w-full">
            {images.map((src, i) => {
            const isActive = i === active;
            return (
                <div
                key={i}
                className={`relative transition-all duration-500
                    ${isActive
                    ? "w-[500px] h-[280px] scale-100 opacity-100 z-10"
                    : "w-[380px] h-[220px] scale-90 opacity-40"}
                `}
                >
                <Image
                    src={src}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover rounded-[25px]"
                />
                </div>
            );
            })}
        </div>

        {/* RIGHT ARROW */}
        <button
            onClick={next}
            className="absolute right-0 z-20 bg-white/70 hover:bg-white text-teal-800 rounded-full w-10 h-10 flex items-center justify-center shadow"
        >
            ›
        </button>

        {/* DOTS */}
        <div className="absolute -bottom-6 flex gap-2">
            {images.map((_, i) => (
            <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all
                ${i === active ? "bg-teal-700 scale-110" : "bg-gray-300"}
                `}
            />
            ))}
        </div>
        </div>

            {/* 2. Info Section */}
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                
                {/* Kiri: Judul + Box */}
                <div className="md:col-span-8 flex flex-col items-start -space-y-6 md:-space-y-8">
                
                {/* Judul */}
                <div className="w-full z-10">
                    <Image
                    src="/Asset/CEG 2026.png"
                    alt="Chemical Engineering Games 2026"
                    width={800}
                    height={200}
                    className="drop-shadow-xl w-full h-auto object-contain object-left"
                    />
                </div>

                {/* Box Konten */}
                <div className="bg-white/40 backdrop-blur-md rounded-[25px] p-6 md:p-8 shadow-lg w-full border border-white/20">
                    <h3 className="font-black text-teal-800 text-xl mb-1">TEMA</h3>
                    <p className="text-teal-950 font-bold mb-4 text-sm md:text-base uppercase italic">
                    AGRINOVA: Agricultural Innovation for Sustainable Nutrition Advancement
                    </p>

                    <h3 className="font-black text-teal-800 text-xl mb-1">MASKOT</h3>
                    <p className="text-teal-950 font-medium text-sm md:text-base leading-relaxed text-justify">
                    AGRINOVA menggambarkan sebuah ledakan inovasi yang lahir dari dunia pertanian sebagai
                    respons terhadap tantangan pangan masa kini dan masa depan. Kata “Nova” berarti bintang
                    baru, yang menjadi simbol munculnya gagasan, pendekatan, dan terobosan baru dalam
                    menciptakan sistem pangan yang lebih sehat, efisien, dan ramah lingkungan. Melalui konsep
                    ini, AGRINOVA merepresentasikan semangat pembaruan dan kreativitas dalam mengembangkan
                    pertanian modern yang tidak hanya berorientasi pada hasil, tetapi juga pada keberlanjutan
                    dan kualitas.
                    </p>
                </div>
                </div>

                {/* Kanan: Maskot */}
                <div className="md:col-span-4 flex justify-center items-end">
                <div className="relative w-full max-w-[320px] md:max-w-none">
                    <Image
                    src="/Asset/No Background.png"
                    alt="Mascot CEG"
                    width={500}
                    height={500}
                    className="w-full h-auto drop-shadow-2xl animate-bounce-slow object-contain"
                    />
                </div>
                </div>

            </div>
            </section>

            {/* ===== SECTION 3: PRE-EVENT ===== */}
            <section id="pre-event" className="w-full flex flex-col items-center snap-start pt-10 pb-5 px-4">
                <div className="flex flex-col items-center w-full max-w-5xl">
                    
                    {/* Gambar Judul - Perkecil margin bawah */}
                    <div className="relative">
                        <Image
                            src="/Asset/PREEVENT.png"
                            alt="Pre-Event Title"
                            width={400}
                            height={100}
                            className="drop-shadow-xl w-[180px] md:w-[350px] h-auto"
                        />
                    </div>

                    {/* Poster Pre-Event - Menggunakan margin-top negatif jika gambar masih terasa jauh */}
                    <div className="relative w-full max-w-4xl -mt-4"> 
                        <Image
                            src="/Asset/PRE-EVENT.png"
                            alt="Pre Event Poster"
                            width={1200}
                            height={600}
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>

                </div>
            </section>

            {/* --- SECTION 4: FAQ --- */}
            <section id="faq" className="min-h-screen w-full flex flex-col items-center justify-center snap-start py-10 px-4">
                <div className="w-full max-w-4xl">
                    <div className="flex justify-center mb-8">
                        <Image
                            src="/Asset/FAQ.png"
                            alt="Frequently Asked Questions"
                            width={400}
                            height={100}
                            className="drop-shadow-xl w-[180px] md:w-[350px] h-auto"
                        />
                    </div>
                    <div className="grid gap-3">
                        {faqData.map((item) => (
                            <div key={item.id} className="group">
                                <h3 className="text-teal-900 font-black text-sm md:text-base ml-4 mb-1">
                                    {item.id}) {item.question}
                                </h3>
                                <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-[20px] px-6 py-4 shadow-sm group-hover:bg-white/60 transition-colors">
                                    <p className="text-teal-950 font-medium text-xs md:text-sm leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: CONTACT & PARTNERS --- */}
            {/* Pakai h-fit agar section tidak memaksa setinggi layar */}
            <section className="relative w-full h-fit snap-start bg-transparent p-0 m-0 overflow-hidden">
                
                {/* Wrapper Utama dengan leading-none untuk hapus spasi antar line */}
                <div className="w-full flex flex-col leading-none p-0 m-0">
                    
                    {/* Gambar 1: Contact Person */}
                    <div className="w-full p-0 m-0">
                        <img 
                            src="/Asset/CONTACT PERSON.png" 
                            alt="Contact Person" 
                            className="w-full h-auto block m-0 p-0"
                            style={{ display: 'block' }} 
                        />
                    </div>

                    {/* Gambar 2: Media Partner */}
                    {/* -mt-1 sampai -mt-5 untuk jaga-jaga jika ada sisa transparansi */}
                    <div className="w-full p-0 m-0 -mt-1 md:-mt-2"> 
                        <img 
                            src="/Asset/MEDIA PARTNER.png" 
                            alt="Media Partner" 
                            className="w-full h-auto block m-0 p-0"
                            style={{ display: 'block' }}
                        />
                    </div>
                    
                </div>
            </section>
        </div>
    )
}