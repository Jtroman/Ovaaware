import { z } from 'zod';

// Define RiskAssessmentInputSchema here
export const RiskAssessmentInputSchema = z.object({
  // Demographics
  race: z.enum(['White', 'Ashkenazi', 'Black', 'Asian', 'Hispanic', 'Native Hawaiian/Pacific Islander']),
  age: z.number().min(0).max(120),
  higher_ed: z.enum(['less_than_high_school', 'high_school', 'some_college', 'college', 'graduate']),
  
  // Reproductive History
  prev_preg: z.number().min(0),
  time_since_preg: z.number().min(0),
  age_at_first_preg: z.number().min(0),
  oral_contra: z.boolean(),
  type_contra: z.enum(['Pill', 'IUD', 'Implant', 'None']),
  len_contra: z.number().min(0),
  menopausal: z.boolean(),
  HRT: z.boolean(),
  period_onset: z.number().min(0),
  
  // Physical Characteristics
  weight: z.number().positive(),
  height: z.number().positive(),
  
  // Family History
  immed_ovarian_family: z.number().min(0),
  immed_breast_family: z.number().min(0),
  distant_ovarian_family: z.boolean(),
  distant_breast_family: z.boolean(),
  
  // Health Conditions
  endo: z.boolean(),
  irreg_period: z.boolean(),
  freq_bloat: z.boolean(),
  smoke: z.boolean(),
});

// Infer the type from the schema defined in this file
export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;

// Default values using the locally defined schema
export const defaultRiskAssessmentValues: RiskAssessmentInput = {
  race: 'White',
  age: 0,
  higher_ed: 'high_school',
  prev_preg: 0,
  time_since_preg: 0,
  age_at_first_preg: 0,
  oral_contra: false,
  type_contra: 'None',
  len_contra: 0,
  menopausal: false,
  HRT: false,
  period_onset: 0,
  weight: 120,
  height: 64,
  immed_ovarian_family: 0,
  immed_breast_family: 0,
  distant_ovarian_family: false,
  distant_breast_family: false,
  endo: false,
  irreg_period: false,
  freq_bloat: false,
  smoke: false,
};
