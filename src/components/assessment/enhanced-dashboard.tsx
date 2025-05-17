import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Info, AlertCircle, FileText, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface RiskData {
  multiplier: number;
  userRisk: number;
  averageRisk: number;
}

interface EnhancedDashboardProps {
  riskData: RiskData;
}

export function EnhancedDashboard({ riskData }: EnhancedDashboardProps) {
  const getRiskCategory = (multiplier: number) => {
    if (multiplier >= 4) return { category: 'High', color: 'text-red-600' };
    if (multiplier >= 2) return { category: 'Moderate', color: 'text-yellow-600' };
    return { category: 'Low', color: 'text-green-600' };
  };

  const riskCategory = getRiskCategory(riskData.multiplier);

  const commonRisks = [
    { event: 'Getting a parking ticket', probability: '1/6' },
    { event: 'Flight cancellation', probability: '1/100' },
    { event: 'Average ovarian cancer risk', probability: '1/19' },
    { event: 'Your ovarian cancer risk', probability: '2/19' },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Risk Overview Section */}
      <Card className="w-full bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Your Risk Assessment</CardTitle>
          <CardDescription>Based on your provided information and family history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <span className="text-6xl font-bold">{riskData.multiplier}x</span>
              <p className={`text-xl font-semibold ${riskCategory.color}`}>
                {riskCategory.category} Risk Category
              </p>
            </div>
            
            {/* Risk Comparison Chart */}
            <div className="w-full space-y-4 mt-8">
              <h3 className="text-lg font-semibold">Risk Comparison</h3>
              {commonRisks.map((risk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{risk.event}</span>
                    <span className="font-medium">{risk.probability}</span>
                  </div>
                  <Progress 
                    value={100 / parseInt(risk.probability.split('/')[1])} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Section */}
      <Card className="w-full bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-teal-50 rounded-lg">
              <Calendar className="h-6 w-6 text-teal-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-teal-900">Schedule Doctor Consultation</h4>
                <p className="text-teal-700 mt-1">
                  Discuss your risk assessment results with a healthcare provider to develop a personalized screening plan.
                </p>
                <Button variant="outline" className="mt-4">
                  Schedule Appointment
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900">Request Medical Records</h4>
                <p className="text-blue-700 mt-1">
                  Gather your family's medical history and request relevant medical records to share with your healthcare provider.
                </p>
                <Button variant="outline" className="mt-4">
                  Start Request Process
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Signs Section */}
      <Card className="w-full bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Warning Signs to Watch For</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Seek immediate medical attention if you experience:</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Persistent bloating</li>
                <li>Difficulty eating or feeling full quickly</li>
                <li>Pelvic or abdominal pain</li>
                <li>Frequent urination</li>
                <li>Changes in bowel habits</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="w-full bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">What does my risk score mean?</h4>
              <p className="text-gray-600 mt-1">
                Your risk score compares your likelihood of developing ovarian cancer to the average population. A score of 2x means you're twice as likely as the average person.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg">How accurate is this assessment?</h4>
              <p className="text-gray-600 mt-1">
                This tool provides an estimate based on known risk factors and your personal history. It should be used as a starting point for discussion with healthcare providers, not as a diagnostic tool.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg">Does insurance cover genetic testing?</h4>
              <p className="text-gray-600 mt-1">
                Many insurance providers cover genetic testing for ovarian cancer risk, especially if you have a family history. Contact your insurance provider for specific coverage details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert variant="default" className="w-full bg-teal-50 border-teal-200">
        <Info className="h-5 w-5 text-teal-600" />
        <AlertTitle className="text-teal-900">Important Notice</AlertTitle>
        <AlertDescription className="text-teal-700">
          This risk assessment is a screening tool and should not be used as a substitute for professional medical advice. Always consult with healthcare providers for proper diagnosis and treatment plans.
        </AlertDescription>
      </Alert>
    </div>
  );
} 