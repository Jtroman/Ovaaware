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
    // Convert boolean values to "yes"/"no" strings for Python API
    const pythonData = {
      ...data,
      oral_contra: data.oral_contra ? "yes" : "no",
      menopausal: data.menopausal ? "yes" : "no",
      HRT: data.HRT ? "yes" : "no",
      distant_ovarian_family: data.distant_ovarian_family ? "yes" : "no",
      distant_breast_family: data.distant_breast_family ? "yes" : "no",
      endo: data.endo ? "yes" : "no",
      irreg_period: data.irreg_period ? "yes" : "no",
      freq_bloat: data.freq_bloat ? "yes" : "no",
      smoke: data.smoke ? "yes" : "no",
    };

    // Call the Python risk calculation API
    const response = await fetch('http://localhost:8000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pythonData),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate risk');
    }

    const riskResult = await response.json();
    
    return {
      data: {
        riskScore: riskResult.risk * 100, // Convert to percentage
        riskLevel: riskResult.risk < 1 ? "Low" : riskResult.risk < 2 ? "Moderate" : "High",
        keyInfluencingFactors: [
          "Age",
          "Family History",
          "BMI",
          "Reproductive History",
          "Lifestyle Factors"
        ],
        nextSteps: `Based on your ${riskResult.risk.toFixed(2)}x increased risk, we recommend: ${
          riskResult.risk >= 2 
            ? "immediate consultation with a specialist"
            : riskResult.risk >= 1 
              ? "regular screenings and lifestyle modifications"
              : "annual check-ups and maintaining healthy habits"
        }`
      }
    };
  } catch (e) {
    console.error("Error in submitOvaAwareAssessment:", e);
    if (e instanceof Error) {
      return { error: "An error occurred while processing your assessment: " + e.message };
    }
    return { error: "An unexpected error occurred while processing your assessment." };
  }
}
