"use client";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MCQView({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleSelect = (option) => {
    if (status !== "idle") return;
    setSelected(option);

    const isCorrect = option === question.correctAnswer;
    setStatus(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      onAnswer(isCorrect);
      setSelected(null);
      setStatus("idle");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">{question.question}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {question.options.map((opt, idx) => {
          let stateStyles =
            "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500";

          if (selected === opt) {
            if (status === "correct")
              stateStyles = "border-green-500 bg-green-500/20 text-green-200";
            if (status === "wrong")
              stateStyles = "border-red-500 bg-red-500/20 text-red-200";
          } else if (status !== "idle" && opt === question.correctAnswer) {
            stateStyles =
              "border-green-500 bg-green-500/10 text-green-300 opacity-60";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              disabled={status !== "idle"}
              className={cn(
                "flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200",
                stateStyles
              )}
            >
              <span className="font-medium">{opt}</span>
              {selected === opt && status === "correct" && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              {selected === opt && status === "wrong" && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
