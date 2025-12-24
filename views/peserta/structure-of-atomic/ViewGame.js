"use client";

import React, { useState, useEffect } from "react";
import { Timer, Trophy, Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Local Imports
import { QUESTIONS } from "./constants";
import MCQView from "./_components/MCQView";
import ConstructView from "./_components/ConstructView";

export default function ViewGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  // Timer Logic
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 10);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setTimeLeft(60);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
        <Trophy className="mb-4 h-24 w-24 text-yellow-500" />
        <h1 className="mb-2 text-4xl font-bold text-white">Game Selesai!</h1>
        <p className="mb-8 text-zinc-400">
          Kamu menyelesaikan rally struktur atom.
        </p>
        <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="text-sm text-zinc-500">Total Skor</div>
          <div className="text-6xl font-bold text-cyan-500">{score}</div>
        </div>
        <Button
          onClick={handleRestart}
          size="lg"
          className="bg-purple-600 hover:bg-purple-500"
        >
          Main Lagi
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-cyan-500/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-cyan-500/10 p-2">
              <Atom className="h-6 w-6 text-cyan-400" />
            </div>
            <span className="hidden font-bold tracking-tight md:inline-block">
              Atomic Rally
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-zinc-500">Waktu</span>
              <div
                className={cn(
                  "flex items-center gap-1 font-mono text-xl font-bold",
                  timeLeft < 10 ? "text-red-500" : "text-white"
                )}
              >
                <Timer className="h-4 w-4" />
                {timeLeft}s
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-zinc-500">Skor</span>
              <span className="font-mono text-xl font-bold text-purple-400">
                {score}
              </span>
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none bg-zinc-900" />
      </header>

      {/* Main Game Area */}
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <Card className="border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm md:p-10">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400">
              Pertanyaan {currentIndex + 1} / {QUESTIONS.length}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-cyan-600">
              {currentQuestion.type === "mcq"
                ? "Pilihan Ganda"
                : "Konstruksi Struktur"}
            </span>
          </div>

          {currentQuestion.type === "mcq" ? (
            <MCQView question={currentQuestion} onAnswer={handleAnswer} />
          ) : (
            <ConstructView question={currentQuestion} onAnswer={handleAnswer} />
          )}
        </Card>
      </main>
    </div>
  );
}
