"use client";

import { useMemo } from "react";
import { passage } from "@/lib/passage";
import { splitIntoSentences } from "@/lib/passageUtils";

export function EvidenceHighlighter({
  selected,
  toggle,
  max = 2,
}: {
  selected: string[];
  toggle: (sentence: string) => void;
  max?: number;
}) {
  const sentences = useMemo(() => splitIntoSentences(passage.content), []);

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-700">
          Select evidence (choose up to {max})
        </div>
        <div className="text-xs text-slate-500">{selected.length}/{max} selected</div>
      </div>

      <div className="max-h-56 space-y-2 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
        {sentences.map((s, i) => {
          const isOn = selected.includes(s);
          return (
            <button
              key={i}
              onClick={() => toggle(s)}
              className={[
                "w-full rounded-lg p-2 text-left text-sm leading-6 transition",
                isOn ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-100",
              ].join(" ")}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div className="mt-2 text-xs text-slate-500">
        You must prove your answer using the passage.
      </div>
    </div>
  );
}
