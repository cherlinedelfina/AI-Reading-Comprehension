import { NextResponse } from "next/server";
import { passage } from "@/lib/passage";
import { QuestionSetSchema } from "@/lib/questionSchema";
import { getOpenAIClient } from "@/lib/openai";

export const runtime = "nodejs";

export async function POST() {
  try {
    const client = getOpenAIClient();

    const prompt = `
You are an expert English reading-comprehension teacher.

Create 10 high-quality comprehension questions that cannot be answered by shallow word-matching.
Avoid trivia. Prioritize inference, cause/effect, role comparison, and process understanding.
Do NOT create multiple-choice questions. Students must type answers.

Return JSON only, matching this schema:
{
  "passageId": string,
  "questions": [
    {
      "id": string,
      "type": "short_answer"|"inference"|"cause_effect"|"sequence"|"evidence",
      "difficulty": 1-5,
      "prompt": string,
      "expectedAnswer": string,
      "rubric": string[],
      "evidenceQuotes": string[],
      "explanation": string
    }
  ]
}

Rules:
- expectedAnswer should be 1–3 sentences.
- rubric should list 2–6 key points (short phrases).
- evidenceQuotes must be EXACT sentences copied from the passage (1–3 sentences).
- explanation should teach why the answer is correct.

Passage:
Title: ${passage.title}
Text:
${passage.content}
`.trim();

    const res = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
      // Force structured JSON output via json_schema
      text: {
        format: {
          type: "json_schema",
          name: "QuestionSet",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              passageId: { type: "string" },
              questions: {
                type: "array",
                minItems: 8,
                maxItems: 12,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    id: { type: "string" },
                    type: {
                      type: "string",
                      enum: ["short_answer", "inference", "cause_effect", "sequence", "evidence"],
                    },
                    difficulty: { type: "integer", minimum: 1, maximum: 5 },
                    prompt: { type: "string" },
                    expectedAnswer: { type: "string" },
                    rubric: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 6 },
                    evidenceQuotes: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 3 },
                    explanation: { type: "string" },
                  },
                  required: ["id", "type", "difficulty", "prompt", "expectedAnswer", "rubric", "evidenceQuotes", "explanation"],
                },
              },
            },
            required: ["passageId", "questions"],
          },
        },
      },
    });

    const text = res.output_text;
    const json = JSON.parse(text);
    const parsed = QuestionSetSchema.parse(json);

    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Failed to generate questions" },
      { status: 500 }
    );
  }
}
