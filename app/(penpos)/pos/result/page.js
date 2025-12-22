"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Loader2, Trophy, AlertCircle, CheckCircle2 } from "lucide-react";
import TeamResultCard from "@/views/Penpos/TeamResultCard";
import { useAppSelector } from "@/core/store/hooks";
import { penpos } from "@/core/services/api";
import useSWR from "swr";
import { toast } from "sonner";

export default function PostResultPage() {
    const router = useRouter();
    const userPenpos = useAppSelector((state) => state.user.userPenpos);

    // Fetch data tim yang sedang bermain dari API
    const { data: currentTeamsData, error: fetchError, isLoading } = useSWR(
        userPenpos ? ["getCurrentTeams", userPenpos] : null,
        () => penpos.setUpdatedTeam({ current_pos: userPenpos })
    );

    const [gameResults, setGameResults] = useState({
        team1: { teamId: null, teamName: "", status: "" },
        team2: { teamId: null, teamName: "", status: "" },
    });
    const [posInfo, setPosInfo] = useState({ type: "BATTLE", name: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Set data tim dari response API
    useEffect(() => {
        if (currentTeamsData?.data?.data) {
            const teams = currentTeamsData.data.data.teams || [];
            const posType = currentTeamsData.data.data.type || "BATTLE";
            const posName = currentTeamsData.data.data.name || "";

            setPosInfo({ type: posType, name: posName });

            setGameResults({
                team1: {
                    teamId: teams[0]?.id || null,
                    teamName: teams[0]?.name || "",
                    status: "",
                },
                team2: posType === "BATTLE" && teams[1]
                    ? {
                        teamId: teams[1]?.id || null,
                        teamName: teams[1]?.name || "",
                        status: "",
                    }
                    : null,
            });
        }
    }, [currentTeamsData]);

    // Submit hasil permainan
    const submitResults = async () => {
        try {
            setSubmitting(true);
            setError(null);

            const payload = {
                pos_id: userPenpos,
                matches: posInfo.type === "SINGLE"
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
            };

            console.log("Mengirim hasil ke Backend:", payload);

            // TODO: Ganti dengan endpoint submit hasil yang sebenarnya
            // const response = await penpos.submitResults(payload);

            // Mock success
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setSubmitSuccess(true);
            toast.success("Hasil berhasil disimpan!");

            // Redirect kembali ke pos page setelah 2 detik
            setTimeout(() => {
                router.push("/pos");
            }, 2000);
        } catch (err) {
            const errorMsg = err?.response?.data?.message || "Gagal menyimpan hasil. Silakan coba lagi.";
            setError(errorMsg);
            toast.error(errorMsg);
            console.error("Error submitting results:", err);
        } finally {
            setSubmitting(false);
        }
    };

    // Validasi apakah semua status sudah diisi
    const isValid = () => {
        if (posInfo.type === "SINGLE") {
            return gameResults.team1.status !== "";
        }
        return gameResults.team1.status !== "" && gameResults.team2?.status !== "";
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-cyan-400" />
                    <p className="mt-4 text-zinc-400">Memuat data tim...</p>
                </div>
            </div>
        );
    }

    if (fetchError || !userPenpos) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
                <Card className="border-red-500/50 bg-red-500/10 p-6">
                    <Alert className="border-0 bg-transparent text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {fetchError ? "Gagal memuat data tim" : "Data pos tidak ditemukan"}
                        </AlertDescription>
                    </Alert>
                    <Button
                        onClick={() => router.push("/pos")}
                        className="mt-4 w-full"
                        variant="outline"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-12">
            {/* Background Effects */}
            <div className="absolute left-1/3 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]"></div>
            <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]"></div>

            <div className="relative z-10 mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
                        {posInfo.name || "Input Hasil Pertandingan"}
                    </h1>
                    <p className="text-zinc-400">Masukkan hasil permainan tim</p>
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
                            Data berhasil disimpan! Mengarahkan kembali...
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-6">
                    {/* Back Button */}
                    <Button
                        onClick={() => router.push("/pos")}
                        variant="ghost"
                        className="text-zinc-400 hover:text-white hover:bg-white/5"
                        disabled={submitting}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Ganti Tim
                    </Button>

                    {/* Team 1 Result Card */}
                    <TeamResultCard
                        teamData={gameResults.team1}
                        onStatusChange={(status) =>
                            setGameResults({
                                ...gameResults,
                                team1: { ...gameResults.team1, status },
                            })
                        }
                    />

                    {/* Team 2 Result Card (only for BATTLE mode) */}
                    {posInfo.type === "BATTLE" && gameResults.team2 && (
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

                    {/* Submit Button */}
                    <Card className="border-white/10 bg-zinc-900/40 backdrop-blur-xl">
                        <CardFooter className="pt-6">
                            <Button
                                onClick={submitResults}
                                disabled={!isValid() || submitting}
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        Selesai & Simpan
                                        <Trophy className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
