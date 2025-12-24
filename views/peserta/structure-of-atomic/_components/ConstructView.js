"use client";
import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Atom } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { INVENTORY_ITEMS } from "../constants";
import DraggableAtom from "./DraggableAtom";
import DroppableSlot from "./DroppableSlot";

export default function ConstructView({ question, onAnswer }) {
  const [assignments, setAssignments] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    setActiveId(null);
    if (over) {
      setAssignments((prev) => ({ ...prev, [over.id]: active.id }));
    }
  };

  const handleRemoveItem = (slotId) => {
    if (feedback) return;
    setAssignments((prev) => {
      const copy = { ...prev };
      delete copy[slotId];
      return copy;
    });
  };

  const checkAnswer = () => {
    const slotIds = question.slots.map((s) => s.id);
    let isAllCorrect = true;

    if (Object.keys(assignments).length !== slotIds.length) {
      alert("Lengkapi semua slot terlebih dahulu!");
      return;
    }

    slotIds.forEach((id) => {
      if (assignments[id] !== question.correctMapping[id]) {
        isAllCorrect = false;
      }
    });

    setFeedback(isAllCorrect ? "correct" : "wrong");
    setTimeout(() => {
      onAnswer(isAllCorrect);
    }, 1500);
  };

  const activeItemData = INVENTORY_ITEMS.find((i) => i.id === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          {question.question}
        </h2>

        {/* Diagram Area */}
        <div className="relative mx-auto h-64 w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-inner">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <Atom className="h-40 w-40 text-cyan-500 animate-pulse" />
          </div>

          {question.slots.map((slot) => (
            <DroppableSlot
              key={slot.id}
              id={slot.id}
              label={slot.label}
              style={slot.style}
              occupiedBy={assignments[slot.id]}
              onRemove={handleRemoveItem}
            />
          ))}

          {feedback && (
            <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-black/40">
              <div
                className={cn(
                  "rounded-full px-6 py-2 text-lg font-bold shadow-xl border",
                  feedback === "correct"
                    ? "bg-green-500 text-white border-green-400"
                    : "bg-red-500 text-white border-red-400"
                )}
              >
                {feedback === "correct"
                  ? "Struktur Stabil!"
                  : "Struktur Tidak Stabil!"}
              </div>
            </div>
          )}
        </div>

        {/* Inventory */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-sm text-zinc-400">
            Tarik Atom ke dalam kotak di atas:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {INVENTORY_ITEMS.map((item) => (
              <DraggableAtom key={item.id} {...item} />
            ))}
          </div>

          <Button
            onClick={checkAnswer}
            disabled={feedback !== null}
            className="mt-2 w-full max-w-xs bg-cyan-600 hover:bg-cyan-500 text-white"
          >
            Cek Struktur
          </Button>
        </div>
      </div>

      <DragOverlay>
        {activeId && activeItemData ? (
          <DraggableAtom {...activeItemData} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
