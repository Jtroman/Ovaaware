"use client";

import type { UseFormReturn } from 'react-hook-form';
import type { RiskAssessmentInput } from '@/lib/schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StepProps {
  form: UseFormReturn<RiskAssessmentInput>;
}

export function DemographicsStep({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="demographics.age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Your current age" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
            </FormControl>
            <FormDescription>Please enter your age in years.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="demographics.race"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Race/Ethnicity</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder="Select your race/ethnicity" /></SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="black">Black or African American</SelectItem>
                <SelectItem value="asian">Asian</SelectItem>
                <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                <SelectItem value="native">American Indian or Alaska Native</SelectItem>
                <SelectItem value="pacific_islander">Native Hawaiian or Other Pacific Islander</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function ReproductiveHistoryStep({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="reproductiveHistory.parity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Pregnancies (Parity)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 2" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
            </FormControl>
            <FormDescription>Total number of times you have been pregnant.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reproductiveHistory.ageAtFirstBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age at First Birth</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 28" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
            </FormControl>
            <FormDescription>Your age when your first child was born. Enter 0 if not applicable.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reproductiveHistory.menopausalStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Menopausal Status</FormLabel>
             <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="premenopausal">Premenopausal</SelectItem>
                <SelectItem value="perimenopausal">Perimenopausal</SelectItem>
                <SelectItem value="postmenopausal">Postmenopausal</SelectItem>
                <SelectItem value="unknown">Unknown / Not sure</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reproductiveHistory.hormoneTherapy"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Hormone Therapy</FormLabel>
              <FormDescription>Are you currently using or have you previously used hormone replacement therapy (HRT)?</FormDescription>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function BehavioralFactorsStep({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="behavioralFactors.smokingStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Smoking Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger><SelectValue placeholder="Select smoking status" /></SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="never_smoked">Never Smoked</SelectItem>
                <SelectItem value="former_smoker">Former Smoker</SelectItem>
                <SelectItem value="current_smoker">Current Smoker</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="behavioralFactors.bmi"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Body Mass Index (BMI)</FormLabel>
            <FormControl>
              <Input type="number" step="0.1" placeholder="e.g., 24.5" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
            </FormControl>
            <FormDescription>You can calculate your BMI using an online calculator if unsure.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function PersonalMedicalHistoryStep({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="personalMedicalHistory.historyOfOvarianCancer"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Personal History of Ovarian Cancer</FormLabel>
              <FormDescription>Have you ever been diagnosed with ovarian cancer?</FormDescription>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalMedicalHistory.historyOfBreastCancer"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Personal History of Breast Cancer</FormLabel>
              <FormDescription>Have you ever been diagnosed with breast cancer?</FormDescription>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export function FamilyCancerHistoryStep({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="familyCancerHistory.numberOfFirstDegreeRelativesWithOvarianCancer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First-Degree Relatives with Ovarian Cancer</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 1" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
            </FormControl>
            <FormDescription>Number of parents, siblings, or children diagnosed with ovarian cancer.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="familyCancerHistory.numberOfFirstDegreeRelativesWithBreastCancer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First-Degree Relatives with Breast Cancer</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 0" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
            </FormControl>
            <FormDescription>Number of parents, siblings, or children diagnosed with breast cancer.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
