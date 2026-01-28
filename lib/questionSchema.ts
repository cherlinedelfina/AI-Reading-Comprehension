import { z } from "zod";

export const QuestionSchema = z.object({
  id: z.string(),
  type: z.enum(["short_answer", "inference", "cause_effect", "sequence", "evidence"]),
  difficulty: z.number().min(1).max(5),
  prompt: z.string(),
  expectedAnswer: z.string(), // 1–3 sentences
  rubric: z.array(z.string()).min(2).max(6),
  evidenceQuotes: z.array(z.string()).min(1).max(3), // exact sentences
  explanation: z.string(),
});

export const QuestionSetSchema = z.object({
  passageId: z.string(),
  questions: z.array(QuestionSchema).min(8).max(12),
});

export type Question = z.infer<typeof QuestionSchema>;
export type QuestionSet = z.infer<typeof QuestionSetSchema>;
