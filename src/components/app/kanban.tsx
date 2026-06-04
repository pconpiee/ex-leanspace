"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  type ApplicationRow,
  type AppStatus,
  STATUS_COLUMNS,
} from "@/lib/db-types";

type Props = { initial: ApplicationRow[] };

export function Kanban({ initial }: Props) {
  const [items, setItems] = useState<ApplicationRow[]>(initial);
  // Keep in sync when server-rendered initial changes (after router.refresh).
  useEffect(() => setItems(initial), [initial]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  const byStatus = useMemo(() => {
    const m: Record<AppStatus, ApplicationRow[]> = {
      saved: [],
      applied: [],
      interview: [],
      offer: [],
      closed: [],
    };
    for (const a of items) m[a.status].push(a);
    for (const s of Object.keys(m) as AppStatus[]) {
      m[s].sort((a, b) => a.column_position - b.column_position);
    }
    return m;
  }, [items]);

  async function persist(id: string, status: AppStatus, position: number) {
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status, column_position: position }),
    });
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);

    setItems((prev) => {
      const dragged = prev.find((p) => p.id === activeId);
      if (!dragged) return prev;

      let targetStatus: AppStatus = dragged.status;
      let insertIndex: number;

      const colTarget = STATUS_COLUMNS.find((c) => c.key === overId);
      if (colTarget) {
        targetStatus = colTarget.key;
        insertIndex = byStatus[targetStatus].filter((a) => a.id !== activeId)
          .length;
      } else {
        const overItem = prev.find((p) => p.id === overId);
        if (!overItem) return prev;
        targetStatus = overItem.status;
        const arr = byStatus[targetStatus].filter((a) => a.id !== activeId);
        insertIndex = arr.findIndex((a) => a.id === overId);
        if (insertIndex < 0) insertIndex = arr.length;
      }

      const next = prev
        .filter((p) => p.id !== activeId)
        .concat({ ...dragged, status: targetStatus });

      const arrInColumn = next.filter((a) => a.status === targetStatus);
      arrInColumn.sort((a, b) => a.column_position - b.column_position);
      const without = arrInColumn.filter((a) => a.id !== activeId);
      const repositioned = [
        ...without.slice(0, insertIndex),
        { ...dragged, status: targetStatus },
        ...without.slice(insertIndex),
      ].map((a, i) => ({ ...a, column_position: i }));

      const finalArr = next.map((a) => {
        if (a.status !== targetStatus) return a;
        const replacement = repositioned.find((r) => r.id === a.id);
        return replacement ?? a;
      });

      // Persist all positions in the affected column.
      Promise.all(
        repositioned.map((r) => persist(r.id, r.status, r.column_position)),
      ).catch(() => {});

      return finalArr;
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUS_COLUMNS.map((c) => (
          <Column key={c.key} status={c.key} label={c.label} items={byStatus[c.key]} />
        ))}
      </div>
    </DndContext>
  );
}

function Column({
  status,
  label,
  items,
}: {
  status: AppStatus;
  label: string;
  items: ApplicationRow[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  return (
    <div
      ref={setNodeRef}
      className={`w-72 shrink-0 rounded-xl p-3 transition ${
        isOver ? "bg-[color:var(--accent-soft)]" : "bg-[color:var(--bg-soft)]"
      }`}
    >
      <div className="flex items-baseline justify-between mb-3 px-1">
        <h3 className="text-sm font-medium">{label}</h3>
        <span className="mono text-xs text-[color:var(--fg-mute)]">
          {items.length}
        </span>
      </div>
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 min-h-[40px]">
          {items.map((a) => (
            <Card key={a.id} app={a} />
          ))}
          {items.length === 0 && (
            <div className="text-xs text-[color:var(--fg-mute)] px-2 py-3">
              Drop here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function Card({ app }: { app: ApplicationRow }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: app.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg p-3 cursor-grab active:cursor-grabbing border hairline bg-[color:var(--bg)]"
    >
      <Link
        href={`/app/applications/${app.id}`}
        onPointerDown={(e) => e.stopPropagation()}
        className="block"
      >
        <div className="text-sm font-medium leading-snug mb-1">
          {app.job_title}
        </div>
        <div className="text-xs text-[color:var(--fg-mute)]">
          {app.company}
          {app.location ? ` · ${app.location}` : ""}
        </div>
        {app.fit_score != null && (
          <div className="mt-2 flex items-center gap-2">
            <FitBar score={app.fit_score} />
            <span className="mono text-xs">{app.fit_score}</span>
          </div>
        )}
      </Link>
    </div>
  );
}

function FitBar({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score));
  const colour =
    pct >= 70
      ? "var(--good)"
      : pct >= 50
        ? "var(--accent)"
        : pct >= 30
          ? "var(--warm)"
          : "var(--warn)";
  return (
    <div className="flex-1 h-1.5 rounded-full bg-[color:var(--panel)]">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: colour }}
      />
    </div>
  );
}
