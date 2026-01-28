export function AnswerInput({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) {
    return (
      <div className="mt-3">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Your answer (type 1–3 sentences)
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 outline-none focus:border-slate-400"
          placeholder="Type your answer here…"
        />
      </div>
    );
  }
  