"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";

/* =====================
   STYLE INPUT (GLOBAL)
===================== */
const inputClass =
  "bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 " +
  "focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:border-cyan-500/40";

const fileInputClass =
  "bg-zinc-900 border-dashed border-zinc-700 text-white " +
  "file:text-white file:bg-transparent";

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
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900"></div>

      <Card className="relative z-10 w-full max-w-4xl border-white/10 bg-zinc-900/40 backdrop-blur-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-white">
              Pendaftaran Tim CEG
            </CardTitle>
            <span className="text-xs text-zinc-500">STEP {step} OF 3</span>
          </div>
          <CardDescription>Lengkapi data kelompok dan anggota</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 max-h-[60vh] overflow-y-auto">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Nama Kelompok</Label>
                  <h4 className="text-cyan-400 flex items-center gap-2">
                    Nama Tim
                  </h4>
                  <Input
                    name="namaKelompok"
                    placeholder="Nama Tim"
                    onChange={handleGroupChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <h4 className="text-cyan-400 flex items-center gap-2">
                    Password
                  </h4>
                  <div className="relative">
                    {/* Icon Lock di Kiri */}
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Masukkan password"
                      onChange={handleGroupChange}
                      // Tambahkan pl-10 (padding-left) agar teks tidak menabrak icon Lock
                      // Tambahkan pr-10 (padding-right) agar teks tidak menabrak icon Mata
                      className={`${inputClass} pl-10 pr-10`}
                      required
                    />

                    {/* Tombol Toggle Mata di Kanan */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-cyan-400 transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Asal Sekolah</Label>
                  <h4 className="text-cyan-400 flex items-center gap-2">
                    Asal Sekolah
                  </h4>
                  <Input
                    name="asalSekolah"
                    placeholder="Asal Sekolah"
                    onChange={handleGroupChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <h4 className="text-cyan-400 flex items-center gap-2">
                    Email
                  </h4>
                  <Input
                    type="email"
                    name="email"
                    placeholder="email@gmail.com"
                    onChange={handleGroupChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <Label>No Telp</Label>
                  <h4 className="text-cyan-400 flex items-center gap-2">
                    No Telp
                  </h4>
                  <Input
                    name="noTelp"
                    placeholder="No Telp"
                    onChange={handleGroupChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>ID Line</Label>
                  <h4 className="text-cyan-400 flex items-center gap-2">
                    ID Line
                  </h4>
                  <Input
                    name="idLine"
                    placeholder="ID Line"
                    onChange={handleGroupChange}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="md:col-span-2 p-4 rounded-lg bg-zinc-950/50 border border-cyan-500/20">
                  <h4 className="text-cyan-400 flex items-center gap-2 font-semibold">
                    <CreditCard className="w-4 h-4" />
                    Informasi Pembayaran
                  </h4>
                  <div className="text-sm text-zinc-300 leading-relaxed">
                    <p>
                      No. Rekening:{" "}
                      <span className="text-white font-medium">5105390707</span>
                    </p>
                    <p>
                      Bank: <span className="text-white font-medium">BCA</span>
                    </p>
                    <p>
                      A/N:{" "}
                      <span className="text-white font-medium">Bierley</span>
                    </p>
                  </div>
                  <div className="pt-2 text-sm text-zinc-300">
                    <p className="text-cyan-400 font-medium mb-1">
                      Biaya Pendaftaran:
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        <span className="text-white font-medium">
                          Early Bird
                        </span>
                        <ul className="ml-5 list-disc text-zinc-400">
                          <li>Rp 150.000 / tim</li>
                          <li>Rp 435.000 / 3 tim</li>
                        </ul>
                      </li>

                      <li>
                        <span className="text-white font-medium">Normal</span>
                        <ul className="ml-5 list-disc text-zinc-400">
                          <li>Rp 170.000 / tim</li>
                          <li>Rp 495.000 / 3 tim</li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <Label className="text-cyan-400">
                      Upload Bukti Pembayaran
                    </Label>
                    <Input
                      type="file"
                      className={fileInputClass + " mt-2"}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 &&
              members.map((m, i) => (
                <div
                  key={i}
                  className="p-6 bg-zinc-950/40 border border-zinc-800 rounded-xl space-y-8"
                >
                  {/* HEADER */}
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-cyan-400 font-semibold">
                      Anggota {i + 1}
                    </h3>
                  </div>

                  {/* ================= DATA PRIBADI ================= */}
                  <section className="space-y-4">
                    <h4 className="text-cyan-400 font-medium">Data Pribadi</h4>

                    <div>
                      <Label className="text-cyan-400">Nama Lengkap</Label>
                      <Input
                        placeholder="Masukkan nama lengkap"
                        value={m.nama}
                        onChange={(e) =>
                          handleMemberChange(i, "nama", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-cyan-400">
                          Alergi
                          <span className="text-xs text-zinc-400 ml-2">
                            (isi “-” jika tidak ada)
                          </span>
                        </Label>
                        <Input
                          placeholder="Contoh: Udang"
                          value={m.alergi}
                          onChange={(e) =>
                            handleMemberChange(i, "alergi", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <Label className="text-cyan-400">
                          Penyakit
                          <span className="text-xs text-zinc-400 ml-2">
                            (isi “-” jika tidak ada)
                          </span>
                        </Label>
                        <Input
                          placeholder="Contoh: Asma"
                          value={m.penyakit}
                          onChange={(e) =>
                            handleMemberChange(i, "penyakit", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </section>

                  {/* ================= DOKUMEN ================= */}
                  <section className="space-y-4 pt-4 border-t border-zinc-800">
                    <h4 className="text-cyan-400 font-medium">Dokumen Wajib</h4>

                    <div>
                      <Label className="text-cyan-400">Pas Foto 3×4</Label>
                      <Input type="file" className={fileInputClass} />
                    </div>

                    <div>
                      <Label className="text-cyan-400">Kartu Pelajar</Label>
                      <Input type="file" className={fileInputClass} />
                    </div>

                    <div>
                      <Label className="text-cyan-400">
                        Bukti Follow Instagram @ceg.ubaya
                      </Label>
                      <Input type="file" className={fileInputClass} />
                    </div>

                    <div>
                      <Label className="text-cyan-400">
                        Bukti Follow Instagram @officialtkubaya
                      </Label>
                      <Input type="file" className={fileInputClass} />
                    </div>
                  </section>

                  {/* ================= KONSUMSI ================= */}
                  <section className="space-y-4 pt-4 border-t border-zinc-800">
                    <h4 className="text-cyan-400 font-medium">Konsumsi</h4>

                    <div>
                      <Label className="text-cyan-400">Pola Makan</Label>
                      <Select
                        value={m.polaMakan}
                        onValueChange={(v) =>
                          handleMemberChange(i, "polaMakan", v)
                        }
                      >
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Pilih pola makan" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 text-white">
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </section>
                </div>
              ))}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-cyan-400 font-semibold text-lg">
                  Contact Person
                </h3>

                {/* CP 1 */}
                <div className="p-5 rounded-xl bg-zinc-950/40 border border-zinc-800 space-y-2">
                  <p className="text-white font-semibold">Safira</p>
                  <p className="text-sm text-zinc-400">
                    LINE: <span className="text-cyan-400">01safsafira</span>
                  </p>
                  <p className="text-sm text-zinc-400">
                    WhatsApp:{" "}
                    <span className="text-cyan-400">088803163354</span>
                  </p>
                </div>

                {/* CP 2 */}
                <div className="p-5 rounded-xl bg-zinc-950/40 border border-zinc-800 space-y-2">
                  <p className="text-white font-semibold">Justin</p>
                  <p className="text-sm text-zinc-400">
                    ID LINE: <span className="text-cyan-400">justin_loka</span>
                  </p>
                  <p className="text-sm text-zinc-400">
                    WhatsApp:{" "}
                    <span className="text-cyan-400">087856913888</span>
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <p className="text-sm text-cyan-300">
                    📌 Silakan hubungi Contact Person di atas jika mengalami
                    kendala saat pendaftaran atau membutuhkan informasi lebih
                    lanjut.
                  </p>
                </div>
              </div>
            )}

            <CardFooter className="flex items-center justify-between gap-4">
              {/* KIRI: Kembali / Login */}
              <div>
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                  </Button>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm text-zinc-400 hover:text-cyan-400 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Login
                  </Link>
                )}
              </div>

              {/* KANAN: Lanjut / Submit */}
              <div>
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={() => setStep((prev) => prev + 1)}
                    className="flex items-center gap-2"
                  >
                    Lanjut
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      "Daftar"
                    )}
                  </Button>
                )}
              </div>
            </CardFooter>
          </CardContent>
        </form>

        {success && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-cyan-500/30 p-6 text-center space-y-4">
              <h2 className="text-2xl font-bold text-cyan-400">
                🎉 Pendaftaran Berhasil
              </h2>

              <p className="text-zinc-300 text-sm">
                Terima kasih telah mendaftar. Tim kami akan menghubungi melalui
                Contact Person yang tersedia.
              </p>

              <Button className="w-full" onClick={() => router.push("/login")}>
                OK
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
