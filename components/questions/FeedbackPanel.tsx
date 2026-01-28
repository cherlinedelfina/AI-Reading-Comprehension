import type { Question } from "@/lib/questionSchema";

export function FeedbackPanel({
  correct,
  feedback,
  question,
  showExpected,
}: {
  correct: boolean;
  feedback: string;
  question: Question;
  showExpected: boolean;
}) {
  return (
    <div className={`mt-4 rounded-2xl border p-4 ${correct ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
      <div className="text-sm font-semibold">
        {correct ? "✅ Correct" : "⚠️ Not quite"}
      </div>
      <div className="mt-1 text-sm text-slate-700">{feedback}</div>

      {!correct && (
        <div className="mt-3 text-sm text-slate-700">
          <div className="font-medium">Explanation</div>
          <div className="mt-1">{question.explanation}</div>

          {showExpected && (
            <>
              <div className="mt-3 font-medium">A strong expected answer looks like:</div>
              <div className="mt-1 rounded-xl bg-white p-3 text-sm">{question.expectedAnswer}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
