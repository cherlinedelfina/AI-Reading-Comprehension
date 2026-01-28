import { useState } from "react";

export function useEvidenceSelection(max = 2) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(sentence: string) {
    setSelected((prev) => {
      const exists = prev.includes(sentence);
      if (exists) return prev.filter((s) => s !== sentence);
      if (prev.length >= max) return [prev[1], sentence].filter(Boolean); // keep last picks
      return [...prev, sentence];
    });
  }

  function clear() {
    setSelected([]);
  }

  return { selected, toggle, clear };
}
