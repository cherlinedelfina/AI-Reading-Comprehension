"use client";

import { useEffect, useState } from "react";
import type { QuestionSet } from "../lib/questionSchema";
import type { Mode } from "../types/question";
import { PassagePanel } from "../components/passage/PassagePanel";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { QuestionCard } from "../components/questions/QuestionCard";
import { AnswerInput } from "../components/questions/AnswerInput";
import { EvidenceHighlighter } from "../components/questions/EvidenceHighlighter";
import { FeedbackPanel } from "../components/questions/FeedbackPanel";
import { FinalScore } from "../components/FinalScore";
import { useQuestionFlow } from "../hooks/useQuestionFlow";
import { useEvidenceSelection } from "../hooks/useEvidenceSelection";

export default function Home() {
  const [mode, setMode] = useState<Mode>("guided");
  const [qs, setQs] = useState<QuestionSet | null>(null);
  const [loading, setLoading] = useState(false);

  const flow = useQuestionFlow(qs);

  // Per-question state
  const [answer, setAnswer] = useState("");
  const evidence = useEvidenceSelection(2);
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<null | { correct: boolean; feedback: string }>(null);
  const [showExpected, setShowExpected] = useState(false);

  async function generate() {
    setLoading(true);
    setQs(null);
    flow.reset();
    resetQuestionState();
  
    try {
      const res = await fetch("/api/generate-questions", { method: "POST" });
      const data = await res.json();
  
      if (!res.ok) {
        console.error("Generate questions failed:", data);
        alert(data?.error ?? "Failed to generate questions. Check server logs.");
        setLoading(false);
        return;
      }
  
      // Guard: ensure correct shape
      if (!data || !Array.isArray(data.questions)) {
        console.error("Unexpected response shape:", data);
        alert("AI returned unexpected format. Check console/server logs.");
        setLoading(false);
        return;
      }
  
      setQs(data);
    } catch (e) {
      console.error(e);
      alert("Network/server error while generating questions.");
    } finally {
      setLoading(false);
    }
  }
  

  function resetQuestionState() {
    setAnswer("");
    evidence.clear();
    setResult(null);
    setShowExpected(false);
    setGrading(false);
  }

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAnswer() {
    if (!flow.current) return;

    setGrading(true);
    setShowExpected(false);

    const res = await fetch("/api/grade-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: flow.current,
        studentAnswer: answer,
        selectedEvidence: evidence.selected,
      }),
    });

    const data = await res.json();
    setResult({ correct: !!data.correct, feedback: data.feedback ?? "—" });
    setGrading(false);
  }

  function nextAfterCorrect() {
    if (!flow.current || !result?.correct) return;
    flow.recordAndNext(flow.current.id, true);
    resetQuestionState();
  }

  function retry() {
    // keep evidence, encourage rewrite
    setResult(null);
    setShowExpected(false);
  }

  const done = flow.done;

  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <div className="text-xs text-slate-500">EdAccelerator</div>
            <div className="text-lg font-semibold">AI Reading Comprehension</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-2xl border p-1 text-sm">
              <button
                onClick={() => setMode("guided")}
                className={`rounded-xl px-3 py-1 ${mode === "guided" ? "bg-slate-900 text-white" : ""}`}
              >
                Guided
              </button>
              <button
                onClick={() => setMode("fast")}
                className={`rounded-xl px-3 py-1 ${mode === "fast" ? "bg-slate-900 text-white" : ""}`}
              >
                Fast
              </button>
            </div>

            <Button onClick={generate} disabled={loading}>
              {loading ? "Generating…" : "Regenerate"}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 lg:grid-cols-2">
        <PassagePanel mode={mode} />

        <div>
          <Card>
            {!qs && (
              <div className="text-sm text-slate-600">
                Loading questions…
              </div>
            )}

            {qs && done && (
              <FinalScore
                correct={flow.correctCount}
                total={flow.total}
                onRestart={() => generate()}
              />
            )}

            {qs && !done && flow.current && (
              <>
                <QuestionCard question={flow.current} index={flow.index} total={flow.total} />

                <AnswerInput value={answer} onChange={setAnswer} />

                <EvidenceHighlighter selected={evidence.selected} toggle={evidence.toggle} max={2} />

                {!result && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                        onClick={checkAnswer}
                        disabled={grading || answer.trim().length < 5 || evidence.selected.length === 0}
                        className="bg-slate-900 hover:bg-slate-800 !text-black border-slate-900"
                        >
                        {grading ? "Checking…" : "Check answer"}
                    </Button>

                    <Button onClick={resetQuestionState} disabled={grading}>
                      Clear
                    </Button>

                    <div className="mt-2 text-xs text-slate-500">
                      Requirement: type an answer + select evidence.
                    </div>
                  </div>
                )}

                {result && (
                  <>
                    <FeedbackPanel
                      correct={result.correct}
                      feedback={result.feedback}
                      question={flow.current}
                      showExpected={showExpected}
                    />

                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.correct ? (
                        <Button
                          onClick={nextAfterCorrect}
                          className="bg-slate-900 text-white hover:bg-slate-800 border-slate-900"
                        >
                          Continue
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={retry}
                            className="bg-slate-900 hover:bg-slate-800 !text-black border-slate-900"
                            >
                            Try again
                        </Button>

                          <Button onClick={() => setShowExpected(true)}>
                            Show a strong expected answer
                          </Button>
                        </>
                      )}
                    </div>

                    {!result.correct && (
                      <div className="mt-3 text-xs text-slate-500">
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
