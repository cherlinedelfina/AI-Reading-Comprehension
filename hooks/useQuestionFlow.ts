import { useMemo, useState } from "react";
import type { QuestionSet, Question } from "@/lib/questionSchema";

export function useQuestionFlow(qs: QuestionSet | null) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState<
    { questionId: string; correct: boolean }[]
  >([]);

  const total = Array.isArray(qs?.questions) ? qs!.questions.length : 0;
  const done = qs ? index >= total : false;

  const current: Question | null = useMemo(() => {
    if (!qs) return null;
    return qs.questions[index] ?? null;
  }, [qs, index]);

  function recordAndNext(questionId: string, correct: boolean) {
    setResults((r) => [...r, { questionId, correct }]);
    if (correct) setCorrectCount((c) => c + 1);
    setIndex((i) => i + 1);
  }

  function reset() {
    setIndex(0);
    setCorrectCount(0);
    setResults([]);
  }

  return { index, total, done, current, correctCount, results, recordAndNext, reset };
}
