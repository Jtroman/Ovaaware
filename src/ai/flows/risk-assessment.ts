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

const RiskAssessmentInputSchema = z.object({
  demographics: z.object({
    age: z.number().describe('Age of the patient.'),
    race: z.string().describe('Race of the patient.'),
  }).describe('Demographic information of the patient.'),
  reproductiveHistory: z.object({
    parity: z.number().describe('Number of pregnancies the patient has had.'),
    ageAtFirstBirth: z.number().describe('Age at first birth.'),
    menopausalStatus: z.string().describe('Menopausal status of the patient.'),
    hormoneTherapy: z.boolean().describe('Whether the patient is on hormone therapy.'),
  }).describe('Reproductive history of the patient.'),
  behavioralFactors: z.object({
    smokingStatus: z.string().describe('Smoking status of the patient.'),
    bmi: z.number().describe('Body mass index of the patient.'),
  }).describe('Behavioral factors of the patient.'),
  personalMedicalHistory: z.object({
    historyOfOvarianCancer: z.boolean().describe('Whether the patient has a history of ovarian cancer.'),
    historyOfBreastCancer: z.boolean().describe('Whether the patient has a history of breast cancer.'),
  }).describe('Personal medical history of the patient.'),
  familyCancerHistory: z.object({
    numberOfFirstDegreeRelativesWithOvarianCancer: z.number().describe('Number of first-degree relatives with ovarian cancer.'),
    numberOfFirstDegreeRelativesWithBreastCancer: z.number().describe('Number of first-degree relatives with breast cancer.'),
  }).describe('Family cancer history of the patient.'),
});
export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;

const RiskAssessmentOutputSchema = z.object({
  riskScore: z.number().describe('The overall risk score for ovarian cancer.'),
  riskLevel: z.string().describe('The risk level (e.g., low, moderate, high).'),
  keyInfluencingFactors: z.array(z.string()).describe('Key factors influencing the risk score.'),
  nextSteps: z.string().describe('Recommended next steps based on the risk level.'),
});
export type RiskAssessmentOutput = z.infer<typeof RiskAssessmentOutputSchema>;

export async function riskAssessment(input: RiskAssessmentInput): Promise<RiskAssessmentOutput> {
  return riskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riskAssessmentPrompt',
  input: {schema: RiskAssessmentInputSchema},
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
    inputSchema: RiskAssessmentInputSchema,
    outputSchema: RiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
