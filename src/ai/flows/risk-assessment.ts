
'use server';

/**
 * @fileOverview Ovarian cancer risk assessment flow.
 *
 * - riskAssessment - A function that handles the risk assessment process.
 * - RiskAssessmentInput - The input type for the riskAssessment function.
 * - RiskAssessmentOutput - The return type for the riskAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
// Import the schema and type from src/lib/schema.ts
import { RiskAssessmentInputSchema, type RiskAssessmentInput } from '@/lib/schema';

// RiskAssessmentOutputSchema remains local as it's used internally by the prompt
// and its type is exported.
const RiskAssessmentOutputSchema = z.object({
  riskScore: z.number().describe('The overall risk score for ovarian cancer.'),
  riskLevel: z.string().describe('The risk level (e.g., low, moderate, high).'),
  keyInfluencingFactors: z.array(z.string()).describe('Key factors influencing the risk score.'),
  nextSteps: z.string().describe('Recommended next steps based on the risk level.'),
});
export type RiskAssessmentOutput = z.infer<typeof RiskAssessmentOutputSchema>;

const prompt = ai.definePrompt({
 name: 'riskAssessmentPrompt',
 input: {schema: RiskAssessmentInputSchema}, // Use the imported schema
 output: {schema: RiskAssessmentOutputSchema},
 prompt: `You are an AI assistant specializing in assessing ovarian cancer risk based on patient-provided information.
 Based on the following information, provide a personalized risk assessment, including a risk score, risk level, key influencing factors, and recommended next steps. Ensure the assessment is easy to understand and avoids alarming language.

 Demographics: Age: {{{demographics.age}}}, Race: {{{demographics.race}}}
 Reproductive History: Parity: {{{reproductiveHistory.parity}}}, Age at First Birth: {{{reproductiveHistory.ageAtFirstBirth}}}, Menopausal Status: {{{reproductiveHistory.menopausalStatus}}}, Hormone Therapy: {{{reproductiveHistory.hormoneTherapy}}}
 Behavioral Factors: Smoking Status: {{{behavioralFactors.smokingStatus}}}, BMI: {{{behavioralFactors.bmi}}}
 Personal Medical History: History of Ovarian Cancer: {{{personalMedicalHistory.historyOfOvarianCancer}}}, History of Breast Cancer: {{{personalMedicalHistory.historyOfBreastCancer}}}
 Family Cancer History: Number of First-Degree Relatives with Ovarian Cancer: {{{familyCancerHistory.numberOfFirstDegreeRelativesWithOvarianCancer}}}, Number of First-Degree Relatives with Breast Cancer: {{{familyCancerHistory.numberOfFirstDegreeRelativesWithBreastCancer}}}

 Provide the response in JSON format.
 `,
  });

const riskAssessmentFlow = ai.defineFlow(
  {
    name: 'riskAssessmentFlow',
    inputSchema: RiskAssessmentInputSchema, // Use the imported schema
    outputSchema: RiskAssessmentOutputSchema,
  },
  async (input: RiskAssessmentInput) => { // Use the imported type
    const {output} = await prompt(input);
    return output!;
  },
);

export async function riskAssessment(
  input: RiskAssessmentInput // Use the imported type
): Promise<RiskAssessmentOutput> {
  return riskAssessmentFlow(input);
}

// Export only the async function and the input/output types
export type { RiskAssessmentInput };
