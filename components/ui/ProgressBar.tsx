export function ProgressBar({ value, max }: { value: number; max: number }) {
    const pct = max === 0 ? 0 : Math.round((value / max) * 100);
    return (
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-slate-900 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }
  