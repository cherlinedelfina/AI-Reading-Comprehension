import type { Question } from "@/lib/questionSchema";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function QuestionCard({
  question,
  index,
  total,
}: {
  question: Question;
  index: number;
  total: number;
}) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500">
            Question {index + 1} of {total} • {question.type} • difficulty {question.difficulty}/5
          </div>
          <div className="mt-1 text-lg font-semibold">{question.prompt}</div>
        </div>
      </div>

      <ProgressBar value={index} max={total} />
    </div>
  );
}
