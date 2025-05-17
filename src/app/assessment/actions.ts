"use server";

import { RiskAssessmentInput, RiskAssessmentOutput, riskAssessment } from '@/ai/flows/risk-assessment';
import { RiskAssessmentInputSchema } from '@/lib/schema';

export async function submitOvaAwareAssessment(
  data: RiskAssessmentInput
): Promise<{ data?: RiskAssessmentOutput; error?: string; validationErrors?: any }> {
  const validationResult = RiskAssessmentInputSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid input data.", validationErrors: validationResult.error.flatten().fieldErrors };
  }

  try {
    const result = await riskAssessment(validationResult.data);
    return { data: result };
  } catch (e) {
    console.error("Error in submitOvaAwareAssessment:", e);
    if (e instanceof Error) {
        return { error: "An error occurred while processing your assessment: " + e.message };
    }
    return { error: "An unexpected error occurred while processing your assessment." };
  }
}
