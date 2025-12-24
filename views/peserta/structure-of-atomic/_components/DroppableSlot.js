"use client";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { INVENTORY_ITEMS } from "../constants";

export default function DroppableSlot({
  id,
  label,
  style,
  occupiedBy,
  onRemove,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const occupiedItem = INVENTORY_ITEMS.find((i) => i.id === occupiedBy);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-dashed transition-colors",
        isOver
          ? "border-cyan-400 bg-cyan-400/20"
          : "border-zinc-700 bg-zinc-900/80",
        occupiedBy ? occupiedItem?.color + " border-solid" : ""
      )}
    >
      {occupiedBy ? (
        <div
          onClick={() => onRemove(id)}
          className="flex h-full w-full cursor-pointer items-center justify-center font-bold text-white hover:text-red-400"
        >
          {occupiedItem?.label}
        </div>
      ) : (
        <span className="text-xs text-zinc-500">Box {label}</span>
      )}
    </div>
  );
}
