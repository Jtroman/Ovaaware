"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAssessmentStore } from '@/lib/store/assessment-store';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { Info } from 'lucide-react';

// Mock data for the age progression chart
const ageProgressionData = [
  { age: 20, risk: 15 },
  { age: 40, risk: 25 },
  { age: 60, risk: 45 },
  { age: 80, risk: 55 },
];

// Mock data for the family planning chart
const familyPlanningData = [
  { year: 2024, risk: 30 },
  { year: 2025, risk: 35 },
  { year: 2026, risk: 32 },
  { year: 2027, risk: 38 },
];

// Risk factor explanations
const riskFactorInfo = {
  "Age": "Risk increases with age, particularly after menopause. Your current age places you in a moderate risk category.",
  "Family History": "Having close relatives with ovarian or breast cancer can significantly increase risk. Your family history contributes to your risk profile.",
  "Genetic Mutations": "Certain inherited gene mutations, particularly in BRCA1 and BRCA2, increase risk. Consider genetic counseling for more information.",
  "Lifestyle": "Factors like diet, exercise, and reproductive choices affect risk. Maintaining a healthy lifestyle can help manage risk.",
};

export default function AssessmentResults() {
  const router = useRouter();
  const { assessmentResults } = useAssessmentStore();

  useEffect(() => {
    if (!assessmentResults) {
      router.push('/assessment');
    }
  }, [assessmentResults, router]);

  if (!assessmentResults) {
    return null;
  }

  const overallRiskScore = 45;
  const riskCategory = overallRiskScore < 33 ? "Low" : overallRiskScore < 66 ? "Medium" : "High";
  const riskColor = overallRiskScore < 33 ? "text-green-600" : overallRiskScore < 66 ? "text-orange-600" : "text-red-600";

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Ovarian Cancer Risk Assessment</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Risk Assessment */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Overall Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-4xl font-bold ${riskColor}`}>{riskCategory}</p>
                <p className="text-gray-600 mt-2">Risk Level</p>
              </div>
              <Progress 
                value={overallRiskScore} 
                className="w-1/2"
                style={{
                  '--progress-background': 'linear-gradient(to right, #ec4899, #db2777)',
                } as React.CSSProperties}
              />
            </div>
          </CardContent>
        </Card>

        {/* MRI Scheduling */}
        <Card className="col-span-1 bg-blue-50">
          <CardHeader>
            <CardTitle>Schedule MRI Screening</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Based on your risk assessment, we recommend scheduling an MRI screening.</p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push('/schedule-mri')}
            >
              Schedule MRI Today
            </Button>
          </CardContent>
        </Card>

        {/* Risk Factor Breakdown */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Risk Factor Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="space-y-4">
                {Object.entries(riskFactorInfo).map(([factor, info]) => (
                  <div key={factor} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span>{factor}</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{info}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span>{Math.floor(Math.random() * 30 + 40)}%</span>
                    </div>
                    <Progress 
                      value={Math.random() * 30 + 40} 
                      className="w-full mt-4 h-2 bg-pink-100"
                      style={{
                        '--progress-background': 'linear-gradient(to right, #ec4899, #db2777)',
                      } as React.CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Age Progression Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Risk by Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ageProgressionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="risk" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Family Planning Impact */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Family Planning Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Genetic Implications</h3>
                <p className="text-gray-600">
                  Understanding your genetic risk factors is crucial for family planning. 
                  Your assessment indicates certain hereditary factors that could affect future generations.
                  Consider genetic counseling for more detailed insights.
                </p>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={familyPlanningData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="risk" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recommendations & Lifestyle Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Medical Recommendations</h3>
                <ul className="list-disc ml-4 space-y-2">
                  <li>Schedule regular gynecological check-ups</li>
                  <li>Consider genetic testing for BRCA1/BRCA2 mutations</li>
                  <li>Discuss hormone therapy options with your healthcare provider</li>
                  <li>Regular cancer screening based on your risk level</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Lifestyle Modifications</h3>
                <ul className="list-disc ml-4 space-y-2">
                  <li>Maintain a healthy BMI through regular exercise</li>
                  <li>Follow a balanced diet rich in fruits and vegetables</li>
                  <li>Consider pregnancy and breastfeeding in family planning</li>
                  <li>Avoid or limit alcohol consumption</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 