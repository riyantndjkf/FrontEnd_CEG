"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Sparkles, Trophy, RotateCcw, CheckCircle2 } from "lucide-react";

// Components UI Shared (Sesuai Image 2)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Local Game Components & Data
import { ITEMS, SLOTS, SCENARIO_TEXT } from "./constants";
import DraggableItem from "./_components/DraggableItem";
import DroppableSlot from "./_components/DroppableSlot";
import FlowConnector from "./_components/FlowConnector";

export default function SortTheProcessGame() {
  const router = useRouter();

  // State Management
  const [placements, setPlacements] = useState({
    slot1: null,
    slot2: null,
    slot3: null,
    slot4: null,
    slot5: null,
    slot6: null,
  });

  const [availableItems, setAvailableItems] = useState(
    ITEMS.map((item) => item.id)
  );
  const [activeId, setActiveId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle Drag Start
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    // Check if dropped over a slot
    if (over.id.startsWith("slot")) {
      const slotId = over.id;
      const itemId = active.id;

      // Check if item is already placed somewhere
      const currentSlot = Object.keys(placements).find(
        (key) => placements[key] === itemId
      );

      // If item was already placed, remove it from that slot
      if (currentSlot) {
        setPlacements((prev) => ({
          ...prev,
          [currentSlot]: null,
        }));
      } else {
        // Remove from available items
        setAvailableItems((prev) => prev.filter((id) => id !== itemId));
      }

      // If slot already has an item, return it to available items
      if (placements[slotId]) {
        setAvailableItems((prev) => [...prev, placements[slotId]]);
      }

      // Place the item in the slot
      setPlacements((prev) => ({
        ...prev,
        [slotId]: itemId,
      }));
    }

    setActiveId(null);
  };

  // Check Answers
  const handleSubmit = () => {
    let correctCount = 0;
    SLOTS.forEach((slot) => {
      if (placements[slot.id] === slot.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / SLOTS.length) * 100);
    setScore(finalScore);
    setShowResults(true);
  };

  // Reset Game
  const handleReset = () => {
    setPlacements({
      slot1: null,
      slot2: null,
      slot3: null,
      slot4: null,
      slot5: null,
      slot6: null,
    });
    setAvailableItems(ITEMS.map((item) => item.id));
    setShowResults(false);
    setScore(null);
  };

  // Check if all slots are filled
  const allSlotsFilled = Object.values(placements).every(
    (item) => item !== null
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative min-h-screen overflow-hidden px-4 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900"></div>
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">
                Chemical Engineering Game
              </span>
            </div>

            <h1 className="mb-2 text-4xl font-bold text-white">
              Sort the Process
            </h1>
            <p className="text-zinc-400">
              Susun proses produksi dengan menyeret alat yang tepat ke setiap
              slot
            </p>
          </div>

          {/* Scenario Card */}
          <Card className="mb-8 border-white/10 bg-zinc-900/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Skenario Proses Produksi
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Baca dengan teliti dan tentukan alat yang sesuai untuk setiap
                tahap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-white">{SCENARIO_TEXT}</p>
            </CardContent>
          </Card>

          {/* Score Display */}
          {showResults && (
            <Alert
              className={`mb-6 ${
                score >= 80
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : score >= 60
                  ? "border-yellow-500/50 bg-yellow-500/10"
                  : "border-rose-500/50 bg-rose-500/10"
              }`}
            >
              <Trophy
                className={`h-4 w-4 ${
                  score >= 80
                    ? "text-emerald-400"
                    : score >= 60
                    ? "text-yellow-400"
                    : "text-rose-400"
                }`}
              />
              <AlertDescription
                className={`${
                  score >= 80
                    ? "text-emerald-400"
                    : score >= 60
                    ? "text-yellow-400"
                    : "text-rose-400"
                }`}
              >
                <span className="font-bold">Skor Anda: {score}/100</span>
                {score >= 80
                  ? " - Sempurna! Anda menguasai proses ini!"
                  : score >= 60
                  ? " - Bagus! Masih ada beberapa yang perlu diperbaiki."
                  : " - Coba lagi! Perhatikan deskripsi setiap alat."}
              </AlertDescription>
            </Alert>
          )}

          {/* Game Area - Process Flow */}
          <Card className="mb-8 border-white/10 bg-zinc-900/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Alur Proses Produksi
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Seret alat dari inventori ke slot yang sesuai
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Flow Layout */}
              <div className="space-y-6">
                {/* Row 1: Slot 1 & 2 (Parallel) */}
                <div className="grid gap-4 md:grid-cols-2">
                  <DroppableSlot
                    slot={SLOTS[0]}
                    placedItem={placements.slot1}
                    isCorrect={placements.slot1 === SLOTS[0].correctAnswer}
                    showResults={showResults}
                  />
                  <DroppableSlot
                    slot={SLOTS[1]}
                    placedItem={placements.slot2}
                    isCorrect={placements.slot2 === SLOTS[1].correctAnswer}
                    showResults={showResults}
                  />
                </div>

                <FlowConnector direction="down" />

                {/* Row 2: Slot 3 & 4 */}
                <div className="grid gap-4 md:grid-cols-2">
                  <DroppableSlot
                    slot={SLOTS[2]}
                    placedItem={placements.slot3}
                    isCorrect={placements.slot3 === SLOTS[2].correctAnswer}
                    showResults={showResults}
                  />
                  <DroppableSlot
                    slot={SLOTS[3]}
                    placedItem={placements.slot4}
                    isCorrect={placements.slot4 === SLOTS[3].correctAnswer}
                    showResults={showResults}
                  />
                </div>

                <FlowConnector direction="down" />

                {/* Row 3: Slot 5 */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div></div> {/* Spacer */}
                  <DroppableSlot
                    slot={SLOTS[4]}
                    placedItem={placements.slot5}
                    isCorrect={placements.slot5 === SLOTS[4].correctAnswer}
                    showResults={showResults}
                  />
                </div>

                <FlowConnector direction="down" />

                {/* Row 4: Slot 6 (Final) */}
                <div className="flex justify-center">
                  <div className="w-full md:w-1/2">
                    <DroppableSlot
                      slot={SLOTS[5]}
                      placedItem={placements.slot6}
                      isCorrect={placements.slot6 === SLOTS[5].correctAnswer}
                      showResults={showResults}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory - Draggable Items */}
          <Card className="sticky bottom-4 border-white/10 bg-zinc-900/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg text-white">
                <span>Inventori Alat</span>
                <Badge className="border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                  {availableItems.length} tersedia
                </Badge>
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Seret alat ke slot yang sesuai
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                {availableItems.map((itemId) => {
                  const item = ITEMS.find((i) => i.id === itemId);
                  return (
                    <DraggableItem
                      key={itemId}
                      item={item}
                      isDragging={activeId === itemId}
                    />
                  );
                })}
              </div>

              {availableItems.length === 0 && !showResults && (
                <p className="py-8 text-center text-sm text-zinc-500">
                  Semua alat sudah ditempatkan
                </p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            {!showResults ? (
              <>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800/50"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!allSlotsFilled}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 disabled:opacity-50"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Selesai
                </Button>
              </>
            ) : (
              <Button
                onClick={handleReset}
                className="bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Main Lagi
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeId ? (
          <DraggableItem
            item={ITEMS.find((i) => i.id === activeId)}
            isDragging={false}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
