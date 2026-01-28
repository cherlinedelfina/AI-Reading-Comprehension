import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function FinalScore({
  correct,
  total,
  onRestart,
}: {
  correct: number;
  total: number;
  onRestart: () => void;
}) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <Card>
      <div className="text-xs text-slate-500">Completed</div>
      <div className="mt-1 text-2xl font-semibold">Your score: {correct}/{total} ({pct}%)</div>

      <div className="mt-3 text-sm text-slate-700">
        Quick tip: retry and focus on selecting the strongest evidence line first.
      </div>

      <div className="mt-4">
        <Button onClick={onRestart} className="bg-slate-900 text-white hover:bg-slate-800">
          Restart
        </Button>
      </div>
    </Card>
  );
}
