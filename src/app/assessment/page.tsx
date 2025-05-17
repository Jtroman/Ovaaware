"use client";

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiskAssessmentInputSchema, defaultRiskAssessmentValues, type RiskAssessmentInput } from '@/lib/schema';
import { submitOvaAwareAssessment } from './actions';
import { useRouter } from 'next/navigation';
import { useAssessmentStore } from '@/lib/store/assessment-store';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, Dna, ArrowRight, ArrowLeft, Loader2, ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

import { DemographicsStep, ReproductiveHistoryStep, PhysicalCharacteristicsStep, FamilyHistoryStep, HealthConditionsStep } from '@/components/assessment/risk-assessment-form-steps';
import { RiskAssessmentResultsDisplay } from '@/components/assessment/risk-assessment-results-display';

const steps = [
  { id: 'demographics', title: 'Demographics', component: DemographicsStep },
  { id: 'reproductive', title: 'Reproductive History', component: ReproductiveHistoryStep },
  { id: 'physical', title: 'Physical Characteristics', component: PhysicalCharacteristicsStep },
  { id: 'family', title: 'Family History', component: FamilyHistoryStep },
  { id: 'health', title: 'Health Conditions', component: HealthConditionsStep },
];

const ConsentSection = ({ onConsent }: { onConsent: () => void }) => {
  const [hasConsented, setHasConsented] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500 via-teal-400 to-teal-300 p-4"
    >
      <Card className="max-w-4xl w-full bg-white/95 backdrop-blur-lg shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-teal-700">
            Your data can save lives. Starting with yours.
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Join us in revolutionizing ovarian cancer detection through secure data sharing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-teal-600" />
              <span className="text-sm text-gray-600">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-teal-600" />
              <span className="text-sm text-gray-600">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Dna className="h-5 w-5 text-teal-600" />
              <span className="text-sm text-gray-600">Research Approved</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-50/50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm text-teal-700 mb-2">Data Usage</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Personalized risk assessment</li>
                <li>• Early detection strategies</li>
                <li>• Anonymous research contribution</li>
              </ul>
            </div>
            <div className="bg-teal-50/50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm text-teal-700 mb-2">Your Rights</h3>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Request data deletion anytime</li>
                <li>• Control data sharing preferences</li>
                <li>• Access your complete history</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-white p-3 rounded-lg">
            <Checkbox 
              id="consent" 
              checked={hasConsented}
              onCheckedChange={(checked) => setHasConsented(checked as boolean)}
              className="mt-0.5"
            />
            <label htmlFor="consent" className="text-xs text-gray-700">
              I consent to the collection and processing of my health data for personalized insights and anonymous research. 
              I understand I can withdraw consent at any time.
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-4">
          <Button
            onClick={onConsent}
            disabled={!hasConsented}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            I Understand and Consent
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function AssessmentPage() {
  const router = useRouter();
  const { setAssessmentResults } = useAssessmentStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [direction, setDirection] = useState(0);

  const form = useForm<RiskAssessmentInput>({
    resolver: zodResolver(RiskAssessmentInputSchema),
    defaultValues: defaultRiskAssessmentValues,
    mode: 'onChange',
  });

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setDirection(1);
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: RiskAssessmentInput) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors(null);
    const response = await submitOvaAwareAssessment(data);
    if (response.data) {
      setAssessmentResults(response.data);
      router.push('/assessment/results');
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]"
      >
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Calculating your assessment... Please wait.</p>
      </motion.div>
    );
  }

  if (!hasStarted) {
    return <ConsentSection onConsent={() => setHasStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-400 via-teal-300 to-teal-200 py-6 px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-[0_4px_20px_-4px_rgba(20,184,166,0.2)] bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl md:text-3xl text-center text-teal-700">
                {steps[currentStep].title}
              </CardTitle>
              <CardDescription className="text-center text-teal-500">
                Step {currentStep + 1} of {steps.length}
              </CardDescription>
              <div className="mt-4 relative">
                <div className="h-2 w-full bg-teal-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressValue}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-sm text-teal-400">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex flex-col items-center ${
                        index <= currentStep ? 'text-teal-600' : 'text-teal-300'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full mb-1 ${
                          index <= currentStep ? 'bg-teal-600' : 'bg-teal-200'
                        }`}
                      />
                      <span className="text-xs hidden md:block">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="relative px-4 py-2 min-h-[400px] overflow-y-auto max-h-[60vh]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-full"
                    >
                      {error && (
                        <Alert variant="destructive" className="mb-4">
                          <ShieldAlert className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      <div className="space-y-4">
                        <CurrentStepComponent form={form} />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
                <CardFooter className="flex justify-between pt-4 pb-4 px-6 border-t border-teal-100 bg-white/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="border-teal-300 text-teal-600 hover:bg-teal-50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Get My Assessment
                    </Button>
                  )}
                </CardFooter>
              </form>
            </FormProvider>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
