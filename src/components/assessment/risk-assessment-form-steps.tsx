"use client";

import type { UseFormReturn } from 'react-hook-form';
import type { RiskAssessmentInput } from '@/lib/schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';

interface StepProps {
  form: UseFormReturn<RiskAssessmentInput>;
}

const FormFieldWrapper = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="mb-4">
    <Label className="text-base font-medium text-gray-700 mb-2 block">{label}</Label>
    {children}
  </div>
);

export function DemographicsStep({ form }: StepProps) {
  return (
    <div className="space-y-4">
      <FormFieldWrapper label="Race">
        <Select 
          onValueChange={(value) => form.setValue('race', value as any)}
          value={form.watch('race')}
        >
          <SelectTrigger className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow">
            <SelectValue placeholder="Select your race" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="White">White</SelectItem>
            <SelectItem value="Ashkenazi">Ashkenazi</SelectItem>
            <SelectItem value="Black">Black</SelectItem>
            <SelectItem value="Asian">Asian</SelectItem>
            <SelectItem value="Hispanic">Hispanic</SelectItem>
            <SelectItem value="Native Hawaiian/Pacific Islander">Native Hawaiian/Pacific Islander</SelectItem>
          </SelectContent>
        </Select>
      </FormFieldWrapper>

      <FormFieldWrapper label="Current Age">
        <Input
          type="number"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('age', { valueAsNumber: true })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Highest Education Received">
        <Select 
          onValueChange={(value) => form.setValue('higher_ed', value as any)}
          value={form.watch('higher_ed')}
        >
          <SelectTrigger className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow">
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less_than_high_school">Less than High School</SelectItem>
            <SelectItem value="high_school">High School</SelectItem>
            <SelectItem value="some_college">Some College</SelectItem>
            <SelectItem value="college">College Degree</SelectItem>
            <SelectItem value="graduate">Graduate Degree</SelectItem>
          </SelectContent>
        </Select>
      </FormFieldWrapper>
    </div>
  );
}

export function ReproductiveHistoryStep({ form }: StepProps) {
  return (
    <div className="space-y-4">
      <FormFieldWrapper label="Number of Previous Pregnancies">
        <Input
          type="number"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('prev_preg', { valueAsNumber: true })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Years Since Last Pregnancy">
        <Input
          type="number"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('time_since_preg', { valueAsNumber: true })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Age at First Pregnancy">
        <Input
          type="number"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('age_at_first_preg', { valueAsNumber: true })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Have you used oral contraceptives?">
        <RadioGroup
          onValueChange={(value) => form.setValue('oral_contra', value === 'yes')}
          value={form.watch('oral_contra') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="oral-contra-yes" />
            <Label htmlFor="oral-contra-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="oral-contra-no" />
            <Label htmlFor="oral-contra-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>

      <FormFieldWrapper label="Type of Contraceptive">
        <Select 
          onValueChange={(value) => form.setValue('type_contra', value as any)}
          value={form.watch('type_contra')}
        >
          <SelectTrigger className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow">
            <SelectValue placeholder="Select contraceptive type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pill">Pill</SelectItem>
            <SelectItem value="IUD">IUD</SelectItem>
            <SelectItem value="Implant">Implant</SelectItem>
            <SelectItem value="None">None</SelectItem>
          </SelectContent>
        </Select>
      </FormFieldWrapper>

      <FormFieldWrapper label="Length of Contraceptive Use (years)">
        <Input
          type="number"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('len_contra', { valueAsNumber: true })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Are you post-menopausal?">
        <RadioGroup
          onValueChange={(value) => form.setValue('menopausal', value === 'yes')}
          value={form.watch('menopausal') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="menopausal-yes" />
            <Label htmlFor="menopausal-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="menopausal-no" />
            <Label htmlFor="menopausal-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>

      <FormFieldWrapper label="Have you used HRT (Hormone Replacement Therapy)?">
        <RadioGroup
          onValueChange={(value) => form.setValue('HRT', value === 'yes')}
          value={form.watch('HRT') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="hrt-yes" />
            <Label htmlFor="hrt-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="hrt-no" />
            <Label htmlFor="hrt-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>

      <FormFieldWrapper label="Age at First Period">
        <Input
          type="number"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('period_onset', { valueAsNumber: true })}
        />
      </FormFieldWrapper>
    </div>
  );
}

export function PhysicalCharacteristicsStep({ form }: StepProps) {
  return (
    <div className="space-y-4">
      <FormFieldWrapper label="Weight (lbs)">
        <Input
          type="number"
          step="0.1"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('weight', { valueAsNumber: true })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Height (inches)">
        <Input
          type="number"
          step="0.1"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('height', { valueAsNumber: true })}
        />
      </FormFieldWrapper>
    </div>
  );
}

export function FamilyHistoryStep({ form }: StepProps) {
  return (
    <div className="space-y-4">
      <FormFieldWrapper label="Immediate Family Members with Ovarian Cancer">
        <Input
          type="number"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('immed_ovarian_family', { valueAsNumber: true })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Immediate Family Members with Breast Cancer">
        <Input
          type="number"
          className="w-full shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)] hover:shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)] transition-shadow"
          {...form.register('immed_breast_family', { valueAsNumber: true })}
        />
      </FormFieldWrapper>

      <FormFieldWrapper label="Distant Family History of Ovarian Cancer?">
        <RadioGroup
          onValueChange={(value) => form.setValue('distant_ovarian_family', value === 'yes')}
          value={form.watch('distant_ovarian_family') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="distant-ovarian-yes" />
            <Label htmlFor="distant-ovarian-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="distant-ovarian-no" />
            <Label htmlFor="distant-ovarian-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>

      <FormFieldWrapper label="Distant Family History of Breast Cancer?">
        <RadioGroup
          onValueChange={(value) => form.setValue('distant_breast_family', value === 'yes')}
          value={form.watch('distant_breast_family') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="distant-breast-yes" />
            <Label htmlFor="distant-breast-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="distant-breast-no" />
            <Label htmlFor="distant-breast-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>
    </div>
  );
}

export function HealthConditionsStep({ form }: StepProps) {
  return (
    <div className="space-y-4">
      <FormFieldWrapper label="Do you have endometriosis?">
        <RadioGroup
          onValueChange={(value) => form.setValue('endo', value === 'yes')}
          value={form.watch('endo') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="endo-yes" />
            <Label htmlFor="endo-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="endo-no" />
            <Label htmlFor="endo-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>

      <FormFieldWrapper label="Do you have painful or irregular periods?">
        <RadioGroup
          onValueChange={(value) => form.setValue('irreg_period', value === 'yes')}
          value={form.watch('irreg_period') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="irreg-period-yes" />
            <Label htmlFor="irreg-period-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="irreg-period-no" />
            <Label htmlFor="irreg-period-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>

      <FormFieldWrapper label="Do you frequently experience bloating?">
        <RadioGroup
          onValueChange={(value) => form.setValue('freq_bloat', value === 'yes')}
          value={form.watch('freq_bloat') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="freq-bloat-yes" />
            <Label htmlFor="freq-bloat-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="freq-bloat-no" />
            <Label htmlFor="freq-bloat-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>

      <FormFieldWrapper label="Do you smoke?">
        <RadioGroup
          onValueChange={(value) => form.setValue('smoke', value === 'yes')}
          value={form.watch('smoke') ? 'yes' : 'no'}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="smoke-yes" />
            <Label htmlFor="smoke-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="smoke-no" />
            <Label htmlFor="smoke-no">No</Label>
          </div>
        </RadioGroup>
      </FormFieldWrapper>
    </div>
  );
}
