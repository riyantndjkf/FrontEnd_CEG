"use client";

import { useState, useEffect } from "react";
// Import UI Components (Pastikan sudah diinstall via shadcn)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import Icons
import {
  Trophy,
  Users,
  Swords,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function PenposGamePage() {
  // Pos Information (Nanti bisa diganti fetch dari API/Session)
  const [posInfo] = useState({
    name: "Pos 1 - Teka Teki Logika",
    type: "Battle", // Ubah ke "Battle" untuk mengetes tampilan battle
  });

  // Teams Data
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Phase Management (1 = Pemilihan Tim, 2 = Input Hasil)
  const [phase, setPhase] = useState(1);

  // Selected Teams
  const [selectedTeams, setSelectedTeams] = useState([]);

  // Game Results (Untuk Phase 2)
  const [gameResults, setGameResults] = useState({
    team1: { teamId: null, status: "" },
    team2: { teamId: null, status: "" },
  });

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 1. Fetch Data Tim dari Express Backend
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);

      // CONTOH INTEGRASI API:
      // const response = await fetch('http://localhost:5000/api/teams-available');
      // const data = await response.json();
      // setTeams(data);

      // --- MOCK DATA (Hapus ini jika Backend sudah siap) ---
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulasi delay

      const mockTeams = [
        { id: 1, name: "Team Alpha", members: 5, color: "cyan" },
        { id: 2, name: "Team Beta", members: 5, color: "blue" },
        { id: 3, name: "Team Gamma", members: 5, color: "purple" },
        { id: 4, name: "Team Delta", members: 5, color: "emerald" },
        { id: 5, name: "Team Epsilon", members: 5, color: "rose" },
      ];
      setTeams(mockTeams);
      // ----------------------------------------------------
    } catch (err) {
      setError("Gagal memuat data tim. Pastikan server backend menyala.");
      console.error("Error fetching teams:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Kirim Hasil ke Express Backend
  const submitResults = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Siapkan payload data
      const payload = {
        posId: 1, // Sesuaikan dengan ID Pos yang login
        posType: posInfo.type,
        matches:
          posInfo.type === "Single"
            ? [
                {
                  teamId: gameResults.team1.teamId,
                  status: gameResults.team1.status,
                },
              ]
            : [
                {
                  teamId: gameResults.team1.teamId,
                  status: gameResults.team1.status,
                },
                {
                  teamId: gameResults.team2.teamId,
                  status: gameResults.team2.status,
                },
              ],
        timestamp: new Date().toISOString(),
      };

      console.log("Mengirim data ke Backend:", payload);

      // CONTOH INTEGRASI API:
      // const response = await fetch('http://localhost:5000/api/game/submit', {
      //    method: 'POST',
      //    headers: { 'Content-Type': 'application/json' },
      //    body: JSON.stringify(payload),
      // });
      // if (!response.ok) throw new Error("Gagal menyimpan");

      // --- MOCK SUCCESS ---
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // --------------------

      setSubmitSuccess(true);

      // Reset otomatis setelah 2 detik
      setTimeout(() => {
        resetGame();
      }, 2000);
    } catch (err) {
      setError("Gagal mengirim hasil. Silakan coba lagi.");
      console.error("Error submitting results:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ==================== LOGIC HANDLERS ====================

  // Handle Centang Tim
  const handleTeamSelect = (teamId) => {
    const isSingle = posInfo.type === "Single";

    if (selectedTeams.includes(teamId)) {
      // Uncheck
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    } else {
      // Check
      if (isSingle) {
        // Mode Single: Cuma boleh 1
        setSelectedTeams([teamId]);
      } else {
        // Mode Battle: Maksimal 2
        if (selectedTeams.length < 2) {
          setSelectedTeams([...selectedTeams, teamId]);
        }
      }
    }
  };

  // Lanjut ke Phase 2 (Input Menang/Kalah)
  const proceedToGameplay = () => {
    const selectedTeamsData = teams.filter((t) => selectedTeams.includes(t.id));

    setGameResults({
      team1: {
        teamId: selectedTeamsData[0]?.id || null,
        teamName: selectedTeamsData[0]?.name || "",
        status: "",
      },
      team2:
        posInfo.type === "Battle"
          ? {
              teamId: selectedTeamsData[1]?.id || null,
              teamName: selectedTeamsData[1]?.name || "",
              status: "",
            }
          : null,
    });

    setPhase(2);
  };

  // Kembali ke Pilihan Tim
  const goBackToSelection = () => {
    setPhase(1);
    setGameResults({
      team1: { teamId: null, status: "" },
      team2: { teamId: null, status: "" },
    });
  };

  // Reset Total
  const resetGame = () => {
    setPhase(1);
    setSelectedTeams([]);
    setGameResults({
      team1: { teamId: null, status: "" },
      team2: { teamId: null, status: "" },
    });
    setSubmitSuccess(false);
    setError(null);
  };

  // Validasi Tombol Selesai
  const isPhase2Valid = () => {
    if (posInfo.type === "Single") {
      return gameResults.team1.status !== "";
    } else {
      // Kalau battle, dua-duanya harus diisi statusnya
      return (
        gameResults.team1.status !== "" && gameResults.team2?.status !== ""
      );
    }
  };

  // ==================== RENDER UI ====================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-cyan-400" />
          <p className="mt-4 text-zinc-400">Memuat data tim...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-12 font-sans">
      {/* Background Effects (Orbs) */}
      <div className="absolute left-1/3 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]"></div>
      <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]"></div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
            {posInfo.type === "Battle" ? (
              <Swords className="h-4 w-4 text-cyan-400" />
            ) : (
              <Trophy className="h-4 w-4 text-cyan-400" />
            )}
            <span className="text-sm font-medium text-cyan-400">
              Mode: {posInfo.type}
            </span>
          </div>

          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
            {posInfo.name}
          </h1>
          <p className="text-zinc-400">
            {phase === 1
              ? `Pilih ${
                  posInfo.type === "Single" ? "1 tim" : "2 tim"
                } untuk memulai permainan`
              : "Masukkan hasil permainan tim"}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-6 border-red-500/50 bg-red-500/10 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {submitSuccess && (
          <Alert className="mb-6 border-emerald-500/50 bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Data berhasil disimpan! Mereset halaman...
            </AlertDescription>
          </Alert>
        )}

        {/* ================= PHASE 1: PILIH TIM ================= */}
        {phase === 1 && (
          <Card className="border-white/10 bg-zinc-900/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl text-white">
                <Users className="h-6 w-6 text-cyan-400" />
                <span>Daftar Tim Tersedia</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => {
                  const isSelected = selectedTeams.includes(team.id);

                  return (
                    <div
                      key={team.id}
                      onClick={() => handleTeamSelect(team.id)}
                      className={`group relative cursor-pointer rounded-xl border p-6 transition-all duration-300 ${
                        isSelected
                          ? `border-${team.color || "cyan"}-500/50 bg-${
                              team.color || "cyan"
                            }-500/10 shadow-lg shadow-cyan-500/10`
                          : "border-white/10 bg-zinc-950/50 hover:border-white/20 hover:bg-zinc-900/80"
                      }`}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <Checkbox
                          checked={isSelected}
                          className={`h-5 w-5 rounded-md border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500`}
                        />
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                        )}
                      </div>

                      <h3 className="mb-1 text-lg font-semibold text-white">
                        {team.name}
                      </h3>
                      <p className="text-sm text-zinc-500">
                        {team.members} Anggota
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                onClick={proceedToGameplay}
                disabled={
                  posInfo.type === "Single"
                    ? selectedTeams.length !== 1
                    : selectedTeams.length !== 2
                }
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50"
              >
                Pilih Tim & Mulai
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* ================= PHASE 2: GAMEPLAY (MENANG/KALAH) ================= */}
        {phase === 2 && (
          <div className="space-y-6 fade-in duration-500">
            <Button
              onClick={goBackToSelection}
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-white/5"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ganti Tim
            </Button>

            {/* Input Card untuk Tim 1 */}
            <TeamResultCard
              teamData={gameResults.team1}
              onStatusChange={(status) =>
                setGameResults({
                  ...gameResults,
                  team1: { ...gameResults.team1, status },
                })
              }
            />

            {/* Input Card untuk Tim 2 (Hanya muncul jika mode Battle) */}
            {posInfo.type === "Battle" && gameResults.team2 && (
              <TeamResultCard
                teamData={gameResults.team2}
                onStatusChange={(status) =>
                  setGameResults({
                    ...gameResults,
                    team2: { ...gameResults.team2, status },
                  })
                }
              />
            )}

            {/* Tombol Submit */}
            <Card className="border-white/10 bg-zinc-900/40 backdrop-blur-xl">
              <CardFooter className="pt-6">
                <Button
                  onClick={submitResults}
                  disabled={!isPhase2Valid() || submitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Selesai & Simpan <Trophy className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// Komponen Kecil untuk Kartu Hasil (Agar kode lebih rapi)
function TeamResultCard({ teamData, onStatusChange }) {
  return (
    <Card className="border-white/10 bg-zinc-900/40 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl text-white">
          {teamData.teamName}
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Tentukan status akhir tim ini
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={teamData.status}
          onValueChange={onStatusChange}
          className="grid gap-4 sm:grid-cols-2"
        >
          {/* Opsi Menang */}
          <div>
            <RadioGroupItem
              value="WIN"
              id={`win-${teamData.teamId}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`win-${teamData.teamId}`}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-white/10 bg-zinc-950/50 p-6 transition-all hover:border-emerald-500/50 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/10"
            >
              <CheckCircle2 className="mb-2 h-8 w-8 text-zinc-500 peer-data-[state=checked]:text-emerald-400" />
              <span className="text-lg font-semibold text-white">Menang</span>
            </Label>
          </div>

          {/* Opsi Kalah */}
          <div>
            <RadioGroupItem
              value="LOSE"
              id={`lose-${teamData.teamId}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`lose-${teamData.teamId}`}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-white/10 bg-zinc-950/50 p-6 transition-all hover:border-rose-500/50 peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-500/10"
            >
              <XCircle className="mb-2 h-8 w-8 text-zinc-500 peer-data-[state=checked]:text-rose-400" />
              <span className="text-lg font-semibold text-white">Kalah</span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
