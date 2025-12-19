"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy, Users, Swords, CheckCircle2, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { setUserPenpos } from "@/core/feature/user/userSlice";
import { penpos } from "@/core/services/api";
import useSWR from "swr";
import { toast } from "sonner";

export default function HomePagePenpos() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const userPenpos = useAppSelector((state) => state.user.userPenpos);

    // Fetch Pos Data menggunakan SWR
    const { data: responseGetPos } = useSWR(
        ["getPos"],
        () => penpos.getPos()
    );

    // Fetch Teams menggunakan SWR setelah mendapat userPenpos
    const { data: teamsResponse, error: teamsError, isLoading: isLoadingTeams } = useSWR(
        userPenpos ? ["getTeams", userPenpos] : null,
        () => penpos.setUpdatedTeam({ current_pos: userPenpos })
    );

    const [posInfo, setPosInfo] = useState({
        name: "",
        type: "BATTLE",
        id: null,
    });

    // Teams Data
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    // Selected Teams
    const [selectedTeams, setSelectedTeams] = useState([]);

    // Submission State
    const [submitting, setSubmitting] = useState(false);

    // Simpan Pos ID & Info ke Redux & localStorage ketika responseGetPos berhasil
    useEffect(() => {
        if (responseGetPos?.data?.data?.pos) {
            const posData = responseGetPos.data.data.pos;
            const { id, name_pos, tipe } = posData;

            dispatch(setUserPenpos(id));
            setPosInfo((prev) => ({
                ...prev,
                id,
                name: name_pos,
                type: tipe,
            }));
            console.log("Pos data disimpan ke Redux & localStorage:", { id, name_pos, tipe });
        }
    }, [responseGetPos, dispatch]);

    // Set teams dari response API setUpdatedTeam
    useEffect(() => {
        if (teamsResponse?.data?.data?.tim) {
            const teamsList = teamsResponse.data.data.tim.map((tim) => ({
                id: tim.id,
                name: tim.nama_tim,
                penpos_id: tim.penpos_id,
                name_pos: tim.name_pos,
            }));
            setTeams(teamsList);
            console.log("Teams berhasil dimuat:", teamsList);
        }
    }, [teamsResponse]);

    // Set error dari teams fetch
    useEffect(() => {
        if (teamsError) {
            setError("Gagal memuat data tim. Pastikan server backend menyala.");
            console.error("Error fetching teams:", teamsError);
        }
    }, [teamsError]);

    // ==================== LOGIC HANDLERS ====================

    // Handle Centang Tim
    const handleTeamSelect = (teamId) => {
        const isSINGLE = posInfo.type === "SINGLE";

        if (selectedTeams.includes(teamId)) {
            // Uncheck
            setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
        } else {
            // Check
            if (isSINGLE) {
                // Mode SINGLE: Cuma boleh 1
                setSelectedTeams([teamId]);
            } else {
                // Mode BATTLE: Maksimal 2
                if (selectedTeams.length < 2) {
                    setSelectedTeams([...selectedTeams, teamId]);
                }
            }
        }
    };

    // Lanjut ke halaman result
    const proceedToGameplay = async () => {
        try {
            setSubmitting(true);
            setError(null);

            // Jika berhasil, redirect ke halaman /post/result
            toast.success("Tim berhasil dipilih!");
            router.push("/pos/result");
        } catch (err) {
            const errorMsg = err?.message || "Gagal memilih tim. Silakan coba lagi.";
            setError(errorMsg);
            toast.error(errorMsg);
            console.error("Error proceedToGameplay:", err);
        } finally {
            setSubmitting(false);
        }
    };

    // ==================== RENDER UI ====================

    if (isLoadingTeams) {
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
                        {posInfo.type === "BATTLE" ? (
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
                        Pilih {posInfo.type === "SINGLE" ? "1 tim" : "2 tim"} untuk memulai permainan
                    </p>
                </div>

                {/* Alerts */}
                {error && (
                    <Alert className="mb-6 border-red-500/50 bg-red-500/10 text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* ================= PILIH TIM ================= */}
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
                                        className={`group relative cursor-pointer rounded-xl border p-6 transition-all duration-300 ${isSelected
                                            ? "border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                                            : "border-white/10 bg-zinc-950/50 hover:border-white/20 hover:bg-zinc-900/80"
                                            }`}
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <Checkbox
                                                checked={isSelected}
                                                className="h-5 w-5 rounded-md border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                            />
                                            {isSelected && (
                                                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                                            )}
                                        </div>

                                        <h3 className="mb-1 text-lg font-semibold text-white">
                                            {team.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500">{team.name_pos}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button
                            onClick={proceedToGameplay}
                            disabled={
                                submitting ||
                                (posInfo.type === "SINGLE"
                                    ? selectedTeams.length !== 1
                                    : selectedTeams.length !== 2)
                            }
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-50"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Pilih Tim & Mulai
                                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
