import type { PassageSection } from "@/lib/passageUtils";

export function PassageNavigator({
  sections,
  activeId,
  onSelect,
}: {
  sections: PassageSection[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={[
            "rounded-full border px-3 py-1 text-xs",
            activeId === s.id
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-white hover:bg-slate-50",
          ].join(" ")}
        >
          {s.title}
        </button>
      ))}
    </div>
  );
}
