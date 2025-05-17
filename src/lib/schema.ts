import { z } from 'zod';

// Re-exporting the schema from the AI flow for use in the form.
// This ensures consistency between the form and the AI model input.
export { RiskAssessmentInputSchema } from '@/ai/flows/risk-assessment';
export type { RiskAssessmentInput } from '@/ai/flows/risk-assessment';

// Example of default values, adjust as necessary
export const defaultRiskAssessmentValues: z.infer<typeof RiskAssessmentInputSchema> = {
  demographics: {
    age: 30, // Example default
    race: '',
  },
  reproductiveHistory: {
    parity: 0,
    ageAtFirstBirth: 0, // Consider how to handle if parity is 0
    menopausalStatus: '',
    hormoneTherapy: false,
  },
  behavioralFactors: {
    smokingStatus: '',
    bmi: 22, // Example default
  },
  personalMedicalHistory: {
    historyOfOvarianCancer: false,
    historyOfBreastCancer: false,
  },
  familyCancerHistory: {
    numberOfFirstDegreeRelativesWithOvarianCancer: 0,
    numberOfFirstDegreeRelativesWithBreastCancer: 0,
  },
};
