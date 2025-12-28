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

    const timelineData = [
    { date: "1 Jan – 21 Feb 2026", event: "Pendaftaran", icon: "📝" },
    { date: "7 Maret 2026", event: "Technical Meeting", icon: "🤝" },
    { date: "28 Maret 2026", event: "Babak Penyisihan", icon: "🧪" },
    { date: "29 Maret 2026", event: "Final Round", icon: "🏆" },
    ];

    const roundsData = [
    {
        title: "Pre-Event",
        desc: "Peserta diwajibkan membuat poster 'Pengembangan Bahan Pangan untuk Inovasi Berkelanjutan' (A3) dan video penjelasan konsep inovasi."
    },
    {
        title: "Games Round",
        desc: "Battle dan single games berisi pertanyaan sains dan pengetahuan umum yang dikemas secara seru dan menarik."
    },
    {
        title: "Examination Round",
        desc: "Pengerjaan soal olimpiade: Kimia, Biologi, Fisika, Matematika, Pengetahuan Umum, dan Teknik Kimia."
    },
    {
        title: "Final Round",
        desc: "Simulasi pabrik: Mencari peralatan teknik kimia melalui games, menyusun flowsheet di Visio, dan presentasi di depan juri."
    }
    ];

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
                    AGRINOVA menggambarkan sebuah ledakan inovasi yang lahir dari dunia pertanian sebagai respons 
                    terhadap tantangan pangan masa kini dan masa depan. Kata “Nova” berarti bintang baru, yang menjadi simbol 
                    munculnya gagasan, pendekatan, dan terobosan baru dalam menciptakan sistem pangan yang lebih sehat, efisien, dan ramah 
                    lingkungan. Melalui konsep ini, AGRINOVA merepresentasikan semangat pembaruan dan kreativitas dalam mengembangkan pertanian 
                    modern yang tidak hanya berorientasi pada hasil, tetapi juga pada keberlanjutan dan kualitas. AGRINOVA merupakan langkah 
                    transformasi dari pertanian tradisional menuju sistem pangan masa depan yang berbasis pada sains, teknologi, dan prinsip 
                    keberlanjutan, guna mendukung ketahanan pangan serta kesejahteraan generasi mendatang.
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

            {/* ===== SECTION: TIMELINE ===== */}
            <section id="timeline" className="min-h-[60vh] w-full flex flex-col items-center justify-center snap-start py-20 px-4">
                <div className="max-w-6xl w-full">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-teal-900 tracking-tighter">TIMELINE CEG 2026</h2>
                        <p className="text-teal-800/60 font-bold tracking-widest uppercase text-sm mt-2">Catat Tanggal Pentingnya!</p>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative">
                        {/* Garis Horizontal (Hanya Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-teal-800/20 -translate-y-1/2"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {timelineData.map((item, idx) => (
                                <div key={idx} className="relative flex flex-col items-center group">
                                    {/* Circle & Icon */}
                                    <div className="w-16 h-16 bg-white border-4 border-teal-800 rounded-full flex items-center justify-center text-2xl z-10 shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-teal-50">
                                        {item.icon}
                                    </div>
                                    
                                    {/* Text Content */}
                                    <div className="text-center mt-6">
                                        <span className="block font-bold text-teal-600 font-black text-xs uppercase tracking-widest mb-1">
                                            {item.date}
                                        </span>
                                        <h4 className="text-lg font-bold text-teal-950 group-hover:text-teal-700 transition-colors">
                                            {item.event}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SECTION: PENJELASAN BABAK (Grid Cards) ===== */}
            <section className="min-h-screen w-full flex flex-col items-center snap-start py-20 px-4 bg-teal-900/10">
                <div className="max-w-6xl w-full">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-teal-900">BABAK PERLOMBAAN</h2>
                        <div className="h-1.5 w-24 bg-teal-700 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {roundsData.map((babak, idx) => (
                            <div key={idx} className="bg-white/60 backdrop-blur-sm p-8 rounded-[30px] border border-white hover:bg-white/80 transition-all shadow-md group">
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl font-black text-teal-500 group-hover:text-teal-500 transition-colors">0{idx + 1}</span>
                                    <div>
                                        <h3 className="text-2xl font-bold text-teal-900 mb-3">{babak.title}</h3>
                                        <p className="text-teal-950/80 leading-relaxed text-justify">{babak.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
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

            {/* ===== SECTION: DOWNLOAD RESOURCES ===== */}
            <section id="resources" className="w-full flex flex-col items-center snap-start py-20 px-4 bg-teal-950/5">
                <div className="max-w-5xl w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <h2 className="text-4xl font-black text-teal-900">RESOURCES</h2>
                            <p className="text-teal-800/70 font-medium">Unduh dokumen pendukung untuk persiapan lomba.</p>
                        </div>
                        <div className="h-1 flex-grow hidden md:block bg-teal-800/10 mx-8 mb-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Download Guidline */}
                        <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[40px] p-10 shadow-2xl hover:shadow-teal-900/10 transition-all group">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 bg-teal-800 rounded-3xl text-white shadow-lg group-hover:rotate-6 transition-transform">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-3 py-1 rounded-full">PDF FILE</span>
                            </div>
                            <h3 className="text-2xl font-black text-teal-950 mb-2">Guideline Book</h3>
                            <p className="text-teal-900/60 text-sm mb-10 leading-relaxed">Berisi informasi mendalam mengenai teknis pendaftaran, tema perlombaan, dan kriteria penilaian.</p>
                            <Button asChild className="w-full bg-teal-800 hover:bg-teal-900 text-white py-7 rounded-2xl font-bold text-lg shadow-lg">
                                <Link href="/Asset/GUIDELINE BOOK CEG 2026 (1).pdf" target="_blank">Download Guide</Link>
                            </Button>
                        </div>

                        {/* Download SOP */}
                        <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[40px] p-10 shadow-2xl hover:shadow-orange-900/10 transition-all group">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 bg-orange-600 rounded-3xl text-white shadow-lg group-hover:rotate-6 transition-transform">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <span className="text-[10px] font-black bg-orange-100 text-orange-800 px-3 py-1 rounded-full">PDF FILE</span>
                            </div>
                            <h3 className="text-2xl font-black text-teal-950 mb-2">SOP Lomba</h3>
                            <p className="text-teal-900/60 text-sm mb-10 leading-relaxed">Panduan prosedur operasional selama hari-h kompetisi agar berjalan sesuai regulasi panitia.</p>
                            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white py-7 rounded-2xl font-bold text-lg shadow-lg">
                                <Link href="/Asset/Standart Operational Procedure Chemical Engineering Games 2026.pdf" target="_blank">Download SOP</Link>
                            </Button>
                        </div>
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