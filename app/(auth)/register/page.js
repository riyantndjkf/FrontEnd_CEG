"use client";
import React, {useState}from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, School, Mail, Phone, Hash, Users, 
  Image as ImageIcon, CreditCard, ArrowLeft, ArrowRight, Loader2, AlertCircle 
} from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); 

  // State untuk data kelompok
  const [groupData, setGroupData] = useState({
    namaKelompok: "",
    asalSekolah: "",
    email: "",
    noWa: "",
    idLine: "",
    buktiBayar: null,
  });

  // State untuk data 3 anggota
  const [members, setMembers] = useState([
    { nama: "", foto: null, kartuPelajar: null, followCeg: null, followTk: null, alergi: "", penyakit: "", polaMakan: "normal" },
    { nama: "", foto: null, kartuPelajar: null, followCeg: null, followTk: null, alergi: "", penyakit: "", polaMakan: "normal" },
    { nama: "", foto: null, kartuPelajar: null, followCeg: null, followTk: null, alergi: "", penyakit: "", polaMakan: "normal" },
  ]);

  const handleGroupChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Logic API integration di sini
    console.log({ groupData, members });
    setTimeout(() => {
      setLoading(false);
      alert("Pendaftaran berhasil (Simulasi)");
      router.push("/login");
    }, 2000);
  };

  return (
    //<div>Register</div>
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Background Decor (Sama dengan Login) */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900"></div>
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl"></div>

      <Card className="relative z-10 w-full max-w-4xl border-white/10 bg-zinc-900/40 shadow-2xl backdrop-blur-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
             <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
               Pendaftaran Tim CEG
             </CardTitle>
             <span className="text-xs text-zinc-500 font-mono">STEP {step} OF 3</span>
          </div>
          <CardDescription>Lengkapi data kelompok dan anggota kamu</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            
            {/* STEP 1: INFORMASI KELOMPOK */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                <div className="space-y-2">
                  <Label>Nama Kelompok</Label>
                  <Input name="namaKelompok" placeholder="Nama tim" onChange={handleGroupChange} className="bg-zinc-950/50 border-white/10" required />
                </div>
                <div className="space-y-2">
                  <Label>Asal Sekolah</Label>
                  <Input name="asalSekolah" placeholder="SMA..." onChange={handleGroupChange} className="bg-zinc-950/50 border-white/10" required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" name="email" placeholder="email@gmail.com" onChange={handleGroupChange} className="bg-zinc-950/50 border-white/10" required />
                </div>
                <div className="space-y-2">
                  <Label>No. WhatsApp</Label>
                  <Input name="noWa" placeholder="08..." onChange={handleGroupChange} className="bg-zinc-950/50 border-white/10" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>ID Line</Label>
                  <Input name="idLine" placeholder="ID Line" onChange={handleGroupChange} className="bg-zinc-950/50 border-white/10" required />
                </div>

                <div className="md:col-span-2 p-4 mt-4 rounded-lg bg-zinc-950/50 border border-cyan-500/20">
                    <h4 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2"><CreditCard className="w-4 h-4"/> Informasi Pembayaran</h4>
                    <p className="text-xs text-zinc-400">BCA: 5105390707 (a.n Bierley)</p>
                    <p className="text-xs text-zinc-400 mb-3 italic">*Keterangan: Nama Kelompok_Asal Sekolah</p>
                    <Label className="text-xs">Upload Bukti Bayar</Label>
                    <Input type="file" className="bg-zinc-900 border-dashed border-zinc-700 mt-1" />
                </div>
              </div>
            )}

            {/* STEP 2: DATA ANGGOTA (LOOP 3) */}
            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                {members.map((member, index) => (
                  <div key={index} className="p-4 rounded-xl border border-white/5 bg-zinc-950/30">
                    <h3 className="text-lg font-bold text-cyan-500 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5"/> Anggota {index + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nama Lengkap</Label>
                        <Input placeholder="Nama Anggota" onChange={(e) => handleMemberChange(index, "nama", e.target.value)} className="bg-zinc-900" />
                      </div>
                      <div className="space-y-2">
                        <Label>Pola Makan</Label>
                        <Select onValueChange={(val) => handleMemberChange(index, "polaMakan", val)}>
                          <SelectTrigger className="bg-zinc-900 border-white/10">
                            <SelectValue placeholder="Pilih pola makan" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 text-white border-white/10">
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Alergi</Label>
                        <Input placeholder="Jika tidak ada isi '-'" onChange={(e) => handleMemberChange(index, "alergi", e.target.value)} className="bg-zinc-900" />
                      </div>
                      <div className="space-y-2">
                        <Label>Penyakit Bawaan</Label>
                        <Input placeholder="Jika tidak ada isi '-'" onChange={(e) => handleMemberChange(index, "penyakit", e.target.value)} className="bg-zinc-900" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 3: UPLOAD BERKAS ANGGOTA */}
            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                {members.map((member, index) => (
                  <div key={index} className="p-4 border-l-4 border-cyan-500 bg-zinc-950/30">
                     <p className="font-bold text-sm mb-3 uppercase tracking-wider">Berkas Anggota {index + 1}: {member.nama || "..."}</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <Label className="text-[10px]">Pas Foto 3x4</Label>
                          <Input type="file" className="text-[10px] h-8 bg-zinc-900" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Kartu Pelajar</Label>
                          <Input type="file" className="text-[10px] h-8 bg-zinc-900" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Bukti Follow @ceg.ubaya</Label>
                          <Input type="file" className="text-[10px] h-8 bg-zinc-900" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Bukti Follow @officialtkubaya</Label>
                          <Input type="file" className="text-[10px] h-8 bg-zinc-900" />
                        </div>
                     </div>
                  </div>
                ))}
                
                {/* INFO BIAYA & CP */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs">
                        <h5 className="font-bold text-blue-400 mb-1">Rincian Biaya:</h5>
                        <p>Early Bird: Rp 150k/tim | Rp 435k/3 tim</p>
                        <p>Normal: Rp 170k/tim | Rp 495k/3 tim</p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-zinc-400">
                        <h5 className="font-bold text-purple-400 mb-1">Contact Person:</h5>
                        <p>Safira (WA: 088803163354)</p>
                        <p>Ko Justin (Line: justin_loka)</p>
                    </div>
                </div>
              </div>
            )}

          </CardContent>

          <CardFooter className="flex justify-between border-t border-white/5 pt-6 mt-4">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="border-white/10 text-white hover:bg-white/5">
                <ArrowLeft className="w-4 h-4 mr-2"/> Kembali
              </Button>
            ) : (
              <Link href="/login" className="text-sm text-zinc-500 hover:text-white flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2"/> Ke Login
              </Link>
            )}

            {step < 3 ? (
              <Button type="button" onClick={() => setStep(step + 1)} className="bg-cyan-600 hover:bg-cyan-500 text-white">
                Lanjut <ArrowRight className="w-4 h-4 ml-2"/>
              </Button>
            ) : (
              <Button type="submit" disabled={loading} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white min-w-[120px]">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Daftar Sekarang"}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  )
}
