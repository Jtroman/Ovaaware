"use client";

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiskAssessmentInputSchema, defaultRiskAssessmentValues, type RiskAssessmentInput } from '@/lib/schema';
import type { RiskAssessmentOutput } from '@/ai/flows/risk-assessment';
import { submitOvaAwareAssessment } from './actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldAlert } from 'lucide-react';

import { DemographicsStep, ReproductiveHistoryStep, BehavioralFactorsStep, PersonalMedicalHistoryStep, FamilyCancerHistoryStep } from '@/components/assessment/risk-assessment-form-steps';
import { RiskAssessmentResultsDisplay } from '@/components/assessment/risk-assessment-results-display';

const steps = [
  { id: 'demographics', title: 'Demographics', component: DemographicsStep },
  { id: 'reproductive', title: 'Reproductive History', component: ReproductiveHistoryStep },
  { id: 'behavioral', title: 'Behavioral Factors', component: BehavioralFactorsStep },
  { id: 'personal_medical', title: 'Personal Medical History', component: PersonalMedicalHistoryStep },
  { id: 'family_cancer', title: 'Family Cancer History', component: FamilyCancerHistoryStep },
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState<RiskAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);


  const form = useForm<RiskAssessmentInput>({
    resolver: zodResolver(RiskAssessmentInputSchema),
    defaultValues: defaultRiskAssessmentValues, // Use imported defaults
    mode: 'onChange', // Validate on change for better UX
  });

  const handleNext = async () => {
    const fieldsToValidate = Object.keys(form.getValues())
      .filter(key => key.startsWith(steps[currentStep].id.split('_')[0])) // Basic field filtering by step prefix
      .map(key => key as keyof RiskAssessmentInput);
    
    // Trigger validation for current step's fields. This is a simplification.
    // For more precise per-step validation, RHF's `trigger` can be used with specific field names.
    const isValid = await form.trigger(); 

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: RiskAssessmentInput) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    const response = await submitOvaAwareAssessment(data);
    if (response.data) {
      setAssessmentResult(response.data);
    } else {
      setError(response.error || "An unknown error occurred.");
      if (response.validationErrors) {
        setValidationErrors(response.validationErrors);
      }
    }
    setIsLoading(false);
  };

  const progressValue = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Calculating your assessment... Please wait.</p>
      </div>
    );
  }

  if (assessmentResult) {
    return (
      <div className="container mx-auto px-4 py-12">
        <RiskAssessmentResultsDisplay results={assessmentResult} />
        <div className="mt-8 text-center">
            <Button onClick={() => { setAssessmentResult(null); setCurrentStep(0); form.reset(defaultRiskAssessmentValues); }} variant="outline">
                Start New Assessment
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-center">Ovarian Cancer Risk Assessment</CardTitle>
          <CardDescription className="text-center">
            Please fill out the following sections to help us assess your risk. All information is handled securely.
          </CardDescription>
          <Progress value={progressValue} className="w-full mt-4" />
          <p className="text-sm text-muted-foreground text-center mt-2">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
        </CardHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 min-h-[300px]">
               {error && (
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {validationErrors && (
                 <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Validation Errors</AlertTitle>
                  <AlertDescription>
                    Please correct the following fields:
                    <ul className="list-disc pl-5 mt-2">
                      {Object.entries(validationErrors).map(([field, messages]) => 
                        (messages || []).map((message, index) => (
                          <li key={`${field}-${index}`}>{field}: {message}</li>
                        ))
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              <CurrentStepComponent form={form} />
            </CardContent>
            <CardFooter className="flex justify-between pt-6 border-t">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Get My Assessment
                </Button>
              )}
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
