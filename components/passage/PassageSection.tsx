export function PassageSection({
    title,
    sentences,
    fontSize = "base",
  }: {
    title: string;
    sentences: string[];
    fontSize?: "base" | "lg";
  }) {
    return (
      <div>
        <div className="mb-2 text-sm font-semibold text-slate-800">{title}</div>
        <div className={fontSize === "lg" ? "text-lg leading-8" : "text-base leading-7"}>
          {sentences.map((s, idx) => (
            <p key={idx} className="mb-3 text-slate-700">
              {s}
            </p>
          ))}
        </div>
      </div>
    );
  }
  