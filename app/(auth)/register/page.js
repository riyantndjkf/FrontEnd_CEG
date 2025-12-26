"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  Users,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Update styling input agar transparan sesuai gambar
const inputClass =
  "bg-white/40 border-none rounded-xl py-6 px-4 text-teal-900 placeholder:text-teal-800/50 " +
  "focus-visible:ring-2 focus-visible:ring-teal-500 backdrop-blur-sm shadow-inner transition-all";

const fileInputClass =
  "bg-white/20 border-dashed border-teal-800/30 text-teal-900 " +
  "file:text-white file:bg-teal-800 file:rounded-md file:border-none cursor-pointer";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [groupData, setGroupData] = useState({
    namaKelompok: "",
    password: "",
    asalSekolah: "",
    email: "",
    noTelp: "",
    idLine: "",
  });

  const [members, setMembers] = useState([
    { nama: "", alergi: "", penyakit: "", polaMakan: "normal" },
    { nama: "", alergi: "", penyakit: "", polaMakan: "normal" },
    { nama: "", alergi: "", penyakit: "", polaMakan: "normal" },
  ]);

  const handleGroupChange = (e) =>
    setGroupData({ ...groupData, [e.target.name]: e.target.value });

  const handleMemberChange = (i, field, val) => {
    const copy = [...members];
    copy[i][field] = val;
    setMembers(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full font-sans">
      {/* 1. Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image 
          src="/Asset/Background Landscape.png" 
          alt="Background" 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* 2. Content Container (Scrollable Page) */}
      <div className="relative flex flex-col items-center justify-center px-4 py-20">
        
        {/* Asset LOGIN.png (Tulisan Welcome) */}
        <div className="mb-10 text-center">
          <Image 
            src="/Asset/LOGIN.png" 
            alt="Welcome Register" 
            width={350} 
            height={120} 
            className="drop-shadow-xl"
          />
          <p className="mt-4 text-teal-900 font-bold bg-white/30 backdrop-blur-sm px-4 py-1 rounded-full inline-block">
            STEP {step} OF 3
          </p>
        </div>

        {/* 3. Form Card - Transparan, No internal scroll */}
        <div className="w-full max-w-4xl bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* STEP 1: Info Kelompok */}
            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold text-lg ml-1">Nama Kelompok</Label>
                  <Input
                    name="namaKelompok"
                    placeholder="Masukkan nama tim"
                    onChange={handleGroupChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold text-lg ml-1">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-teal-800" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Buat password kelompok"
                      onChange={handleGroupChange}
                      className={`${inputClass} pl-12 pr-12`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-800 hover:text-teal-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold text-lg ml-1">Asal Sekolah</Label>
                  <Input name="asalSekolah" placeholder="SMA Negeri..." onChange={handleGroupChange} className={inputClass} required />
                </div>

                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold text-lg ml-1">Email</Label>
                  <Input type="email" name="email" placeholder="tim@gmail.com" onChange={handleGroupChange} className={inputClass} required />
                </div>

                {/* Info Pembayaran Box */}
                <div className="md:col-span-2 p-6 rounded-2xl bg-teal-900/80 text-white shadow-lg space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                    <CreditCard className="w-6 h-6" />
                    <h4 className="font-bold text-xl">Informasi Pembayaran</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="opacity-70">Transfer Ke:</p>
                      <p className="text-lg font-bold tracking-widest">5105390707 (BCA)</p>
                      <p className="font-medium uppercase">A/N Bierley</p>
                    </div>
                    <div>
                      <p className="opacity-70">Biaya:</p>
                      <p className="font-bold">Early: Rp 150.000 / Tim</p>
                      <p className="font-bold">Normal: Rp 170.000 / Tim</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Label className="text-white font-bold mb-2 block">Upload Bukti Transfer</Label>
                    <Input type="file" className={fileInputClass} required />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Anggota (Tanpa scroll internal) */}
            {step === 2 && (
              <div className="space-y-10">
                {members.map((m, i) => (
                  <div key={i} className="bg-white/30 p-8 rounded-2xl border border-white/40 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 border-b border-teal-800/20 pb-3">
                      <div className="bg-teal-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <h3 className="text-teal-900 font-black text-xl">ANGGOTA {i + 1}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-teal-900 font-bold ml-1">Nama Lengkap</Label>
                        <Input 
                          placeholder="Sesuai kartu pelajar" 
                          value={m.nama} 
                          onChange={(e) => handleMemberChange(i, "nama", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1">Alergi ( - jika tidak ada)</Label>
                        <Input value={m.alergi} onChange={(e) => handleMemberChange(i, "alergi", e.target.value)} className={inputClass} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1">Pas Foto 3x4</Label>
                        <Input type="file" className={fileInputClass} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 3: Contact Person */}
            {step === 3 && (
              <div className="max-w-2xl mx-auto space-y-6">
                 <div className="bg-teal-800 text-white p-6 rounded-2xl shadow-xl space-y-4">
                    <h3 className="text-2xl font-black border-b border-white/20 pb-2">Hubungi Kami</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Safira (LINE)</span>
                        <span className="bg-white/20 px-3 py-1 rounded-md">01safsafira</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Justin (WA)</span>
                        <span className="bg-white/20 px-3 py-1 rounded-md">087856913888</span>
                      </div>
                    </div>
                 </div>
                 <div className="text-center p-4 bg-white/40 rounded-xl italic text-teal-900 font-medium">
                   "Pastikan data yang diisi sudah benar sebelum menekan tombol Daftar."
                 </div>
              </div>
            )}

            {/* Navigasi Button */}
            <div className="flex items-center justify-between pt-10 border-t border-teal-800/10">
              <Button
                type="button"
                variant="ghost"
                onClick={() => step > 1 ? setStep(step - 1) : router.push("/login")}
                className="text-teal-900 font-bold text-lg hover:bg-white/20"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                {step === 1 ? "Ke Login" : "Kembali"}
              </Button>

              <Button
                type={step === 3 ? "submit" : "button"}
                onClick={() => step < 3 && setStep(step + 1)}
                disabled={loading}
                className="bg-teal-800 hover:bg-teal-900 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-lg transition-transform active:scale-95"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-6 w-6" />
                ) : step === 3 ? (
                  "DAFTAR SEKARANG"
                ) : (
                  <>Lanjut <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-teal-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl">
            <div className="text-6xl text-center">🎉</div>
            <h2 className="text-2xl font-black text-teal-900 uppercase">Pendaftaran Berhasil!</h2>
            <p className="text-teal-800 font-medium">Data kelompokmu sudah kami terima. Sampai jumpa di CEG 2026!</p>
            <Button className="w-full bg-teal-800 py-6 rounded-xl font-bold text-lg" onClick={() => router.push("/login")}>
              OKE!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}