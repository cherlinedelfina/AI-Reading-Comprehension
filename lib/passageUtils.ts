export type PassageSection = {
    id: string;
    title: string;
    sentences: string[];
  };
  
  function normalizeText(t: string) {
    return t.replace(/\s+/g, " ").trim();
  }
  
  export function splitIntoSentences(raw: string): string[] {
    const text = normalizeText(raw);
  
    // Simple sentence splitting (MVP): split on ". " while keeping last period.
    // Handles quotes loosely. Good enough for take-home.
    const parts = text
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  
    return parts;
  }
  
  export function buildSectionsFromPassage(content: string): PassageSection[] {
    const sentences = splitIntoSentences(content);
  
    // Hand-made grouping rules for this passage (simple + readable).
    // In a real app, you could use AI or heuristics to segment.
    const groups: { title: string; from: number; to: number }[] = [
      { title: "Hive overview", from: 0, to: 2 },
      { title: "Queen’s role", from: 2, to: 6 },
      { title: "Worker bee lifecycle", from: 6, to: 10 },
      { title: "Drones & autumn", from: 10, to: 14 },
      { title: "Waggle dance communication", from: 14, to: 18 },
      { title: "Honey timescale & impact", from: 18, to: sentences.length },
    ];
  
    return groups.map((g, idx) => ({
      id: `sec-${idx + 1}`,
      title: g.title,
      sentences: sentences.slice(g.from, g.to),
    }));
  }
  