"use client";
import React, { useState } from "react";
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
  CheckCircle2,
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
import Navbar from "@/components/shared/Dashboard/navbar";

const inputClass =
  "bg-white/40 border-none rounded-xl py-6 px-4 text-teal-900 placeholder:text-teal-800/50 " +
  "focus-visible:ring-2 focus-visible:ring-teal-500 backdrop-blur-sm shadow-inner transition-all";

const fileInputClass =
  "bg-white/20 border-dashed border-teal-800/30 text-teal-900 text-xs " +
  "file:text-xs file:text-white file:bg-teal-800 file:rounded-md file:border-none cursor-pointer h-12";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); 
  const [regType, setRegType] = useState("single"); 
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0); 
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [allTeamsData, setAllTeamsData] = useState([
    {
      groupData: { namaKelompok: "", password: "", asalSekolah: "", email: "", noTelp: "", idLine: "" },
      members: Array(3).fill(null).map(() => ({ 
        nama: "", alergi: "", polaMakan: "normal" 
      })),
    },
  ]);

  // LOGIKA HARGA
  const isEarlyBird = new Date() < new Date("2025-12-31"); 
  const getPrice = () => {
    if (regType === "single") return isEarlyBird ? 150000 : 170000;
    return isEarlyBird ? 435000 : 495000;
  };

  const totalHarga = getPrice();
  const formattedHarga = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(totalHarga);

  const handleGroupChange = (e) => {
    const { name, value } = e.target;
    const updated = [...allTeamsData];
    updated[currentTeamIndex].groupData[name] = value;
    setAllTeamsData(updated);
  };

  const handleMemberChange = (memberIdx, field, val) => {
    const updated = [...allTeamsData];
    updated[currentTeamIndex].members[memberIdx][field] = val;
    setAllTeamsData(updated);
  };

  const handleNext = () => {
    if (step === 0) {
      const count = regType === "bundle" ? 3 : 1;
      setAllTeamsData(Array(count).fill(null).map(() => ({
        groupData: { namaKelompok: "", password: "", asalSekolah: "", email: "", noTelp: "", idLine: "" },
        members: Array(3).fill(null).map(() => ({ nama: "", alergi: "", polaMakan: "normal" })),
      })));
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (regType === "bundle" && currentTeamIndex < 2) {
        setCurrentTeamIndex(currentTeamIndex + 1);
        setStep(1);
        window.scrollTo(0, 0);
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 1 && currentTeamIndex > 0) {
      setCurrentTeamIndex(currentTeamIndex - 1);
      setStep(2);
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const fileInputClass =
  "bg-white/40 border-2 border-dashed border-teal-800/20 text-teal-900 text-sm " +
  "file:mr-4 file:h-full file:px-4 md:file:px-10 file:rounded-l-xl file:border-0 " + // md:px-10 untuk komputer, px-4 untuk HP
  "file:text-sm file:font-bold file:bg-teal-800 file:text-white " +
  "file:hover:bg-teal-900 cursor-pointer h-[64px] flex items-center rounded-xl transition-all overflow-hidden p-0";

  return (
    <div className="relative min-h-screen w-full font-sans">
      <div className="fixed inset-0 -z-10">
        <Image src="/Asset/Background Landscape.png" alt="Background" fill className="object-cover" priority />
      </div>
      <Navbar />

      <div className="relative flex flex-col items-center justify-center px-4 pt-10 pb-20">
        {/* Kurangi mb-10 menjadi mb-4 atau mb-2 */}
        <div className="mb-4 text-center">
          <div className="mb-2"> {/* Kurangi margin bawah gambar */}
            <Image 
              src="/Asset/LOGIN.png" 
              alt="Welcome" 
              width={400} 
              height={150} 
              className="drop-shadow-xl" 
            />
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-teal-900 font-bold bg-white/30 backdrop-blur-sm px-6 py-1 rounded-full inline-block uppercase tracking-wider text-sm">
              {step === 0 ? "PILIH PAKET" : `TIM ${currentTeamIndex + 1} - STEP ${step} OF 4`}
            </p>
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 md:p-12">
          
          {step === 0 && (
            <div className="grid md:grid-cols-2 gap-6 py-10">
              <button onClick={() => setRegType("single")} className={`p-8 rounded-3xl border-4 transition-all flex flex-col items-center gap-4 ${regType === 'single' ? 'border-teal-800 bg-teal-800/20' : 'border-white/40 bg-white/10'}`}>
                <Users size={48} className="text-teal-900" />
                <h3 className="text-2xl font-black text-teal-900">PAKET SINGLE</h3>
                <p className="text-teal-800">Daftar untuk 1 Tim</p>
              </button>
              <button onClick={() => setRegType("bundle")} className={`p-8 rounded-3xl border-4 transition-all flex flex-col items-center gap-4 ${regType === 'bundle' ? 'border-teal-800 bg-teal-800/20' : 'border-white/40 bg-white/10'}`}>
                <div className="flex gap-[-10px]"><Users size={40} className="text-teal-900" /><Users size={40} className="text-teal-900" /></div>
                <h3 className="text-2xl font-black text-teal-900 uppercase">Paket Bundle</h3>
                <p className="text-teal-800">Daftar untuk 3 Tim Sekaligus</p>
                <span className="text-xs font-bold text-teal-900 bg-white/40 px-2 py-1 rounded uppercase">Lebih Hemat</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                <div className="md:col-span-2 border-b border-teal-900/10 pb-2">
                   <h2 className="text-2xl font-black text-teal-900 uppercase">Data Kelompok {regType === 'bundle' && (currentTeamIndex + 1)}</h2>
                </div>
                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold ml-1">Nama Kelompok</Label>
                  <Input name="namaKelompok" placeholder="Nama tim" value={allTeamsData[currentTeamIndex].groupData.namaKelompok} onChange={handleGroupChange} className={inputClass} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold ml-1">Password</Label>
                  <Input type="password" name="password" placeholder="Password tim" value={allTeamsData[currentTeamIndex].groupData.password} onChange={handleGroupChange} className={inputClass} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold ml-1">Asal Sekolah</Label>
                  <Input name="asalSekolah" placeholder="SMA..." value={allTeamsData[currentTeamIndex].groupData.asalSekolah} onChange={handleGroupChange} className={inputClass} required />
                </div>
                <div className="space-y-2 text-teal-900 font-bold">
                  <Label className="ml-1">Email</Label>
                  <Input type="email" name="email" placeholder="email@gmail.com" value={allTeamsData[currentTeamIndex].groupData.email} onChange={handleGroupChange} className={inputClass} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold ml-1">No Telp (WhatsApp)</Label>
                  <Input name="noTelp" placeholder="08..." value={allTeamsData[currentTeamIndex].groupData.noTelp} onChange={handleGroupChange} className={inputClass} required />
                </div>
                <div className="space-y-2">
                  <Label className="text-teal-900 font-bold ml-1">ID Line</Label>
                  <Input name="idLine" placeholder="ID Line" value={allTeamsData[currentTeamIndex].groupData.idLine} onChange={handleGroupChange} className={inputClass} required />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12 animate-in fade-in duration-500">
                {allTeamsData[currentTeamIndex].members.map((m, i) => (
                  <div key={i} className="bg-white/30 p-8 rounded-[40px] border border-white/40 shadow-sm space-y-8 backdrop-blur-md">
                    <div className="flex items-center gap-4 border-b border-teal-800/10 pb-4">
                      <span className="bg-teal-800 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black">
                        0{i + 1}
                      </span>
                      <h3 className="text-teal-900 font-black text-2xl uppercase tracking-tight">Data Anggota {i + 1}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                      {/* Baris 1: Nama & Pola Makan */}
                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1 uppercase text-xs tracking-widest">Nama Lengkap</Label>
                        <Input 
                          value={m.nama} 
                          placeholder="Sesuai Kartu Pelajar"
                          onChange={(e) => handleMemberChange(i, "nama", e.target.value)} 
                          className={inputClass} 
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1 uppercase text-xs tracking-widest">Pola Makan</Label>
                        <Select onValueChange={(v) => handleMemberChange(i, "polaMakan", v)} defaultValue={m.polaMakan}>
                          {/* Gunakan h-auto dan py-6 agar tingginya sama persis dengan inputClass. 
                            W-full memastikan lebar box kanan kiri seimbang.
                          */}
                          <SelectTrigger className={`${inputClass} h-auto py-6 w-full border-none shadow-inner`}>
                            <SelectValue placeholder="Pilih Pola Makan" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/90 backdrop-blur-md border-teal-800/20 rounded-xl">
                            <SelectItem value="normal" className="text-teal-900 focus:bg-teal-100">Normal</SelectItem>
                            <SelectItem value="vegetarian" className="text-teal-900 focus:bg-teal-100">Vegetarian</SelectItem>
                            <SelectItem value="vegan" className="text-teal-900 focus:bg-teal-100">Vegan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Baris 2: Alergi & Penyakit */}
                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1 uppercase text-xs tracking-widest">Alergi</Label>
                        <Input 
                          value={m.alergi} 
                          placeholder="Isi - jika tidak ada"
                          onChange={(e) => handleMemberChange(i, "alergi", e.target.value)} 
                          className={inputClass} 
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1 uppercase text-xs tracking-widest">Riwayat Penyakit</Label>
                        <Input 
                          value={m.penyakit} 
                          placeholder="Isi - jika tidak ada"
                          onChange={(e) => handleMemberChange(i, "penyakit", e.target.value)} 
                          className={inputClass} 
                          required 
                        />
                      </div>

                      {/* Baris 3: Upload Pas Foto & Kartu pelajar */}
                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1 uppercase text-xs tracking-widest">Pas Foto 3x4</Label>
                        <Input type="file" className={fileInputClass} required />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1 uppercase text-xs tracking-widest">Foto Kartu Pelajar</Label>
                        <Input type="file" className={fileInputClass} required />
                      </div>

                      {/* Baris 4: Upload IG1 & IG 2  */}
                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1 uppercase text-xs tracking-widest">Follow @ceg.ubaya</Label>
                        <Input type="file" className={fileInputClass} required />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-teal-900 font-bold ml-1 uppercase text-xs tracking-widest">Follow @officialtkubaya</Label>
                        <Input type="file" className={fileInputClass} required />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="p-6 md:p-8 rounded-[40px] bg-teal-900 text-white space-y-6 shadow-2xl animate-in zoom-in duration-300 border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-400 p-2 rounded-2xl">
                    <CreditCard size={32} className="text-teal-900" /> 
                  </div>
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Pembayaran Final</h2>
                </div>

                {/* Section Detail Transfer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 p-6 rounded-3xl backdrop-blur-sm border border-white/5">
                  <div className="space-y-1">
                    <p className="text-xs opacity-70 italic font-medium uppercase tracking-wider">Transfer Ke (BCA):</p>
                    <p className="text-2xl font-black text-white">5105390707</p>
                    <p className="font-bold text-yellow-400">A/N BIERLEY</p>
                  </div>
                  
                  <div className="md:text-right flex flex-col md:justify-center border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                    <p className="text-xs opacity-70 uppercase font-medium tracking-wider">Total Bayar ({isEarlyBird ? 'Early' : 'Normal'}):</p>
                    {/* Di HP teks harga diperkecil sedikit agar tidak overflow */}
                    <p className="text-3xl md:text-5xl font-black text-yellow-400 mt-1">{formattedHarga}</p>
                  </div>
                </div>

                {/* Section Upload */}
                <div className="space-y-3 pt-2">
                  <Label className="font-bold text-lg ml-1 block">Upload Bukti Transfer</Label>
                  <div className="relative group">
                    <Input 
                      type="file" 
                      className={`${fileInputClass} bg-white/10 text-white file:bg-yellow-400 file:text-teal-900`} 
                      required 
                    />
                  </div>
                  <p className="text-[10px] md:text-xs opacity-50 italic ml-1">
                    *Pastikan file berformat .jpg, .png, atau .pdf (Maks 2MB)
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="max-w-2xl mx-auto space-y-6 text-center">
                 <CheckCircle2 size={80} className="mx-auto text-teal-800" />
                 <h2 className="text-3xl font-black text-teal-900 uppercase">Data Terverifikasi</h2>
                 <p className="text-teal-800 font-medium italic">Silakan klik "DAFTAR SEKARANG" untuk menyelesaikan pendaftaran.</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-10 border-t border-teal-800/10">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={handleBack} className="text-teal-900 font-bold text-lg hover:bg-white/20">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Kembali
                </Button>
              ) : <div />}

              <Button
                type={step === 4 ? "submit" : "button"}
                onClick={step === 4 ? undefined : handleNext}
                disabled={loading}
                className="bg-teal-800 hover:bg-teal-900 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-lg transition-transform active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin h-6 w-6" /> : step === 4 ? "DAFTAR SEKARANG" : step === 0 ? "MULAI DAFTAR" : "Lanjut"}
                {step < 4 && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-teal-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-black text-teal-900 uppercase">Berhasil!</h2>
            <p className="text-teal-800">Data pendaftaran sudah kami terima. Sampai jumpa di CEG 2026!</p>
            <Button className="w-full bg-teal-800 py-6 rounded-xl font-bold" onClick={() => router.push("/login")}>OKE!</Button>
          </div>
        </div>
      )}
    </div>
  );
}