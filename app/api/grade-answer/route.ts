import { NextResponse } from "next/server";
import { z } from "zod";
import { QuestionSchema } from "@/lib/questionSchema";
import { gradeDeterministic } from "@/lib/scoring";

export const runtime = "nodejs";

const BodySchema = z.object({
  question: QuestionSchema,
  studentAnswer: z.string().min(1),
  selectedEvidence: z.array(z.string()).max(3),
});

export async function POST(req: Request) {
  try {
    const body = BodySchema.parse(await req.json());
    const result = gradeDeterministic(body);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Failed to grade" },
      { status: 400 }
    );
  }
}
