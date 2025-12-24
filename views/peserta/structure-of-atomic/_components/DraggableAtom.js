"use client";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export default function DraggableAtom({ id, label, color, isOverlay }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { label, color },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex h-12 w-12 cursor-grab items-center justify-center rounded-full border-2 text-sm font-bold shadow-lg backdrop-blur-md transition-all active:cursor-grabbing",
        color,
        isOverlay
          ? "scale-110 shadow-cyan-500/50 z-50 cursor-grabbing"
          : "hover:scale-105"
      )}
    >
      {label}
    </div>
  );
}
