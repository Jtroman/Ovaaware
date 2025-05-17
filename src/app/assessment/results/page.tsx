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
  BarChart,
  Bar,
  LabelList,
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
  "Age": {
    description: "Ovarian cancer risk increases significantly with age, particularly after age 50. Post-menopausal women are at the highest risk, with incidence rates peaking in women aged 63 and above.",
    keyStats: "Women over 60 represent over 70% of ovarian cancer diagnoses.",
    references: [
      {
        title: "National Cancer Institute – Age and Ovarian Cancer Risk",
        url: "https://www.cancer.gov/types/ovarian/patient/ovarian-prevention-pdq#_113"
      },
      {
        title: "American Cancer Society – Ovarian Cancer Facts & Figures",
        url: "https://www.cancer.org/cancer/ovarian-cancer/causes-risks-prevention/risk-factors.html"
      }
    ]
  },
  "Family History": {
    description: "Women with first-degree relatives (mother, sister, daughter) diagnosed with ovarian or breast cancer have a significantly higher risk. Genetic mutations like BRCA1 and BRCA2 can increase risk by up to 39–44%.",
    keyStats: "About 15% of ovarian cancer cases are linked to hereditary syndromes.",
    references: [
      {
        title: "CDC – Hereditary Breast and Ovarian Cancer (HBOC) Facts",
        url: "https://www.cdc.gov/cancer/ovarian/basic_info/risk_factors.htm"
      },
      {
        title: "JAMA Oncology – Family History and Ovarian Cancer Risk",
        url: "https://jamanetwork.com/journals/jamaoncology"
      }
    ]
  },
  "Menstrual History": {
    description: "Early onset of menstruation (before age 12) and late menopause (after age 52) increase lifetime exposure to estrogen, elevating the risk of ovarian cancer.",
    keyStats: "Women with over 40 years of menstrual cycles have nearly double the risk.",
    references: [
      {
        title: "The Lancet – Menstrual History and Ovarian Cancer",
        url: "https://www.thelancet.com/journals/lanonc/home"
      },
      {
        title: "American Society of Clinical Oncology – Reproductive History and Cancer Risk",
        url: "https://www.cancer.net/cancer-types/ovarian-fallopian-tube-and-peritoneal-cancer/risk-factors"
      }
    ]
  },
  "Lifestyle Factors": {
    description: "Lifestyle choices like smoking, obesity, and hormone replacement therapy have been associated with increased ovarian cancer risk. Conversely, oral contraceptive use is linked to a 30–50% reduction in risk.",
    keyStats: "Obesity raises the risk by 15–20%, while smoking is linked specifically to mucinous ovarian tumors.",
    references: [
      {
        title: "National Institutes of Health – Lifestyle and Ovarian Cancer Risk",
        url: "https://www.nih.gov/health-information/ovarian-cancer"
      },
      {
        title: "Cancer Research UK – Lifestyle Risk Factors for Ovarian Cancer",
        url: "https://www.cancerresearchuk.org/about-cancer/ovarian-cancer/risks-causes"
      }
    ]
  }
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

  const riskMultiplier = 4.22;
  const riskLevel = "Moderate";
  const riskColor = "text-teal-700";

  return (
    <div className="w-full py-8 px-4">
      {/* Risk Summary Section */}
      <div className="text-center mb-12 w-full">
        <h2 className="text-2xl text-gray-600 mb-4">Based on your risk factors</h2>
        <p className="text-5xl font-bold mb-3">
          You are <span className={riskColor}>{riskMultiplier}x</span> more likely than the average person to develop ovarian cancer
        </p>
        <p className={`text-lg ${riskColor}`}>
          This puts you in the {riskLevel} risk category.
        </p>
      </div>

      {/* Appointment Box - Full Width */}
      <div className="w-full mb-12">
        <Card className="bg-teal-50">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Schedule a Doctor Consultation Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4 text-lg">Based on your risk assessment, we recommend scheduling a consultation with a gynecologist.</p>
            <Button 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white text-lg py-6"
              onClick={() => router.push('/find-doctor')}
            >
              Find a Gynecologist Near You
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Grid */}
      <h2 className="text-3xl font-bold mb-6">Detailed Risk Assessment</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factor Breakdown */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Risk Factor Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="space-y-4">
                {Object.entries(riskFactorInfo).map(([factor, info]) => (
                  <div key={factor} className="relative bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{factor}</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-gray-500 hover:text-teal-500 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-md p-4 bg-white rounded-lg shadow-xl border border-teal-100">
                            <div className="space-y-3">
                              <p className="font-medium text-gray-900">{info.description}</p>
                              <p className="text-sm text-gray-600">{info.keyStats}</p>
                              <div className="pt-2 border-t border-gray-200">
                                <p className="text-sm font-medium text-gray-900 mb-2">References:</p>
                                <ul className="space-y-1">
                                  {info.references.map((ref, idx) => (
                                    <li key={idx}>
                                      <a
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-teal-600 hover:text-teal-800"
                                      >
                                        {ref.title}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="text-lg font-medium">{Math.floor(Math.random() * 30 + 40)}%</span>
                    </div>
                    <Progress 
                      value={Math.random() * 30 + 40} 
                      className="w-full mt-4 h-2 bg-teal-100"
                      style={{
                        '--progress-background': 'linear-gradient(to right, #14b8a6, #0d9488)',
                      } as React.CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Comparison Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>How Does Your Risk Compare?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "Average Risk",
                      value: 5.26,
                      label: "1 in 19",
                      description: "Average chance of ovarian cancer"
                    },
                    {
                      name: "Your Risk",
                      value: 10.52,
                      label: "2 in 19",
                      description: "Your chance of ovarian cancer",
                      fill: "#14b8a6"  // Teal-500
                    },
                    {
                      name: "Parking Ticket",
                      value: 5,
                      label: "5%",
                      description: "Getting a parking ticket in NYC"
                    },
                    {
                      name: "Flight Cancellation",
                      value: 2.2,
                      label: "2.2%",
                      description: "The Chance of Your Flight Being Cancelled"
                    }
                  ]}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 12]} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={90}
                    style={{ fontSize: '12px' }}
                  />
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-teal-200">
                            <p className="font-semibold">{data.name}</p>
                            <p className="text-sm text-gray-600">{data.description}</p>
                            <p className="text-sm font-medium mt-1">{data.label}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="value"
                    fill="#94A3B8"
                  >
                    <LabelList 
                      dataKey="label" 
                      position="right"
                      style={{ fill: '#475569', fontSize: '12px' }}
                    />
                  </Bar>
                </BarChart>
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
                <h3 className="text-xl font-semibold mb-2">Genetic Implications</h3>
                <p className="text-gray-600 text-lg">
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
                    <Line type="monotone" dataKey="risk" stroke="#14b8a6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps and FAQ Sections */}
        <div className="space-y-8">
          {/* Next Steps Box */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Next Steps to Manage Your Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-teal-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-teal-800">Request Your Medical Records</h3>
                <p className="text-gray-700 mb-6 text-lg">
                  To provide you with a more accurate risk assessment, we need access to your Electronic Health Records (EHR). 
                  This will help us analyze:
                </p>
                <ul className="list-disc ml-6 mb-8 text-gray-600 space-y-3 text-lg">
                  <li>Previous screening results</li>
                  <li>Detailed family history</li>
                  <li>Relevant lab test results</li>
                  <li>Past medical procedures</li>
                </ul>
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-lg font-semibold"
                  onClick={() => router.push('/request-records')}
                >
                  Request a Release Form
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Box */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Common Questions & Warning Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Common Warning Signs</h3>
                    <p className="text-gray-600 mb-3">Early detection is crucial. Watch for:</p>
                    <ul className="list-disc ml-6 text-gray-600 space-y-2">
                      <li>Persistent bloating</li>
                      <li>Pelvic or abdominal pain</li>
                      <li>Feeling full quickly</li>
                      <li>Urinary urgency or frequency</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Advanced-Stage Symptoms</h3>
                    <ul className="list-disc ml-6 text-gray-600 space-y-2">
                      <li>Ascites (fluid buildup)</li>
                      <li>Severe abdominal pain</li>
                      <li>Bowel obstructions</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Genetic Testing</h3>
                    <p className="text-gray-600 mb-3">
                      Testing for BRCA1/BRCA2 mutations can help determine your risk level and treatment options.
                    </p>
                    <ul className="list-disc ml-6 text-gray-600 space-y-2">
                      <li>Hereditary cancer screening</li>
                      <li>Gene mutation analysis</li>
                      <li>Family risk assessment</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Insurance & Cost</h3>
                    <p className="text-gray-600 mb-3">
                      Most insurance plans cover ovarian cancer screenings. Contact your provider to verify coverage for:
                    </p>
                    <ul className="list-disc ml-6 text-gray-600 space-y-2">
                      <li>Preventive screenings</li>
                      <li>Genetic counseling</li>
                      <li>Specialist consultations</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-teal-800 mb-4">Screening Recommendations</h3>
                  <p className="text-gray-600 mb-3">
                    Screening frequency depends on your risk level. Discuss with your doctor about:
                  </p>
                  <ul className="list-disc ml-6 text-gray-600 space-y-2">
                    <li>Regular pelvic exams</li>
                    <li>Transvaginal ultrasound</li>
                    <li>CA-125 blood tests</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 