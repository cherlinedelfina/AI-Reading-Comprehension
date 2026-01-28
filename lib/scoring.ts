import type { Question } from "./questionSchema";

function tokenize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function gradeDeterministic(args: {
  question: Question;
  studentAnswer: string;
  selectedEvidence: string[];
}) {
  const { question, studentAnswer, selectedEvidence } = args;

  // Evidence check: must match one of the expected evidence quotes exactly (or trimmed match)
  const expected = new Set(question.evidenceQuotes.map((q) => q.trim()));
  const evidenceOk =
    selectedEvidence.length > 0 &&
    selectedEvidence.some((s) => expected.has(s.trim()));

  // Rubric check: require >=2 rubric keywords to appear in answer (MVP heuristic)
  const answerTokens = new Set(tokenize(studentAnswer));
  const rubricHits = question.rubric.filter((r) => {
    const rTokens = tokenize(r);
    return rTokens.some((t) => answerTokens.has(t));
  });

  const rubricOk = rubricHits.length >= Math.min(2, question.rubric.length);

  const correct = evidenceOk && rubricOk;

  const feedback = correct
    ? "Nice — your answer is supported by the passage."
    : buildFeedback({ evidenceOk, rubricHits, question });

  return {
    correct,
    evidenceOk,
    rubricHits,
    feedback,
    expectedEvidence: question.evidenceQuotes,
  };
}

function buildFeedback(args: {
  evidenceOk: boolean;
  rubricHits: string[];
  question: Question;
}) {
  const { evidenceOk, rubricHits, question } = args;

  const missing = question.rubric.filter((r) => !rubricHits.includes(r));

  const lines: string[] = [];
  if (!evidenceOk) {
    lines.push("Your evidence doesn’t match the key line(s) in the passage.");
  }
  if (missing.length > 0) {
    lines.push(`Try including: ${missing.slice(0, 3).join(", ")}.`);
  }
  lines.push("Read the highlighted section again, then rewrite your answer.");
  return lines.join(" ");
}
