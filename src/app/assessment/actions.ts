"use server";

import { RiskAssessmentInput, RiskAssessmentOutput } from '@/ai/flows/risk-assessment';
import { RiskAssessmentInputSchema } from '@/lib/schema';

// Mock assessment result
const mockAssessmentResult: RiskAssessmentOutput = {
  riskScore: 45,
  riskLevel: "Moderate",
  keyInfluencingFactors: [
    "Age",
    "Family History",
    "Genetic Mutations",
    "Lifestyle",
    "Medical History"
  ],
  nextSteps: "Based on your risk factors, we recommend regular check-ups and lifestyle modifications."
};

export async function submitOvaAwareAssessment(
  data: RiskAssessmentInput
): Promise<{ data?: RiskAssessmentOutput; error?: string; validationErrors?: any }> {
  const validationResult = RiskAssessmentInputSchema.safeParse(data);
  if (!validationResult.success) {
    return { error: "Invalid input data.", validationErrors: validationResult.error.flatten().fieldErrors };
  }

  try {
    // Return mock data instead of calling the API
    return { data: mockAssessmentResult };
  } catch (e) {
    console.error("Error in submitOvaAwareAssessment:", e);
    if (e instanceof Error) {
        return { error: "An error occurred while processing your assessment: " + e.message };
    }
    return { error: "An unexpected error occurred while processing your assessment." };
  }
}
