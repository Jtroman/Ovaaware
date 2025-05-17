"use client";

import type { RiskAssessmentOutput } from '@/ai/flows/risk-assessment';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, CheckSquare, Info, ListChecks, ShieldAlert, TrendingUp } from 'lucide-react';

interface RiskAssessmentResultsDisplayProps {
  results: RiskAssessmentOutput;
}

export function RiskAssessmentResultsDisplay({ results }: RiskAssessmentResultsDisplayProps) {
  const getRiskLevelBadgeVariant = (level: string) => {
    if (level.toLowerCase().includes('high')) return 'destructive';
    if (level.toLowerCase().includes('moderate')) return 'secondary'; // Using secondary, can define a 'warning' variant
    return 'default'; // Low or other
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <BarChart className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Your Personalized Risk Assessment</CardTitle>
          </div>
          <CardDescription>
            This assessment provides an estimate of your risk based on the information you provided.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-around items-center gap-6 p-6 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Your Risk Score</p>
              <p className="text-5xl font-bold text-primary">{results.riskScore}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <Badge variant={getRiskLevelBadgeVariant(results.riskLevel)} className="text-2xl px-4 py-2">
                {results.riskLevel}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Key Influencing Factors</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {results.keyInfluencingFactors.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {results.keyInfluencingFactors.map((factor, index) => (
                <li key={index} className="text-foreground">{factor}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No specific key factors highlighted for your current assessment, or all factors contribute moderately.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <ListChecks className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Recommended Next Steps</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-foreground">{results.nextSteps}</p>
        </CardContent>
      </Card>
      
      <ReassuranceMessage />

    </div>
  );
}


export function ReassuranceMessage() {
  return (
    <Alert variant="default" className="bg-accent/30 border-accent">
      <Info className="h-5 w-5 text-accent-foreground" />
      <AlertTitle className="font-semibold text-accent-foreground">Important to Remember</AlertTitle>
      <AlertDescription className="text-accent-foreground/80">
        Risk assessments are based on probabilities and statistical data. A higher risk score does not mean you will definitely develop ovarian cancer, and a lower risk score does not eliminate the possibility. This tool is for informational purposes and to help guide conversations with your healthcare provider. Always consult a medical professional for diagnosis, treatment, and personal medical advice.
      </AlertDescription>
    </Alert>
  );
}
