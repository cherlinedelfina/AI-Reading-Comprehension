"use client";

import { useMemo, useState } from "react";
import { passage } from "@/lib/passage";
import { buildSectionsFromPassage } from "@/lib/passageUtils";
import type { Mode } from "@/types/question";
import { Card } from "@/components/ui/Card";
import { PassageNavigator } from "./PassageNavigator";
import { PassageSection } from "./PassageSection";

export function PassagePanel({ mode }: { mode: Mode }) {
  const sections = useMemo(() => buildSectionsFromPassage(passage.content), []);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "sec-1");
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <Card className="sticky top-16 h-fit lg:top-20">
      <div className="mb-3">
        <div className="text-xs text-slate-500">Passage</div>
        <div className="text-lg font-semibold">{passage.title}</div>
      </div>

      <div className="mb-4">
        <PassageNavigator sections={sections} activeId={activeId} onSelect={setActiveId} />
      </div>

      <PassageSection
        title={active.title}
        sentences={active.sentences}
        fontSize={mode === "guided" ? "lg" : "base"}
      />

      <div className="mt-4 text-xs text-slate-500">
        Tip: Use the section buttons to quickly re-find details.
      </div>
    </Card>
  );
}
