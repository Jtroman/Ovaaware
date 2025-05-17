import { z } from 'zod';

// Define RiskAssessmentInputSchema here
export const RiskAssessmentInputSchema = z.object({
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

// Infer the type from the schema defined in this file
export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;

// Default values using the locally defined schema
export const defaultRiskAssessmentValues: RiskAssessmentInput = {
  demographics: {
    age: 30,
    race: '',
  },
  reproductiveHistory: {
    parity: 0,
    ageAtFirstBirth: 0,
    menopausalStatus: '',
    hormoneTherapy: false,
  },
  behavioralFactors: {
    smokingStatus: '',
    bmi: 22,
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
