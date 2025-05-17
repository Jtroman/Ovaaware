"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { Edit2, History, Settings, FileText, AlertCircle } from 'lucide-react';
import type { RiskAssessmentInput } from '@/lib/schema';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  lastAssessment?: Date;
}

interface AssessmentHistory {
  date: Date;
  data: RiskAssessmentInput;
  result: {
    riskLevel: 'Low' | 'Medium' | 'High';
    score: number;
  };
}

export default function MePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentHistory[]>([]);

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const savedHistory = localStorage.getItem('assessmentHistory');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedHistory) {
      setAssessmentHistory(JSON.parse(savedHistory).map((h: any) => ({
        ...h,
        date: new Date(h.date)
      })));
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <Card className="mb-6 bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(236,72,153,0.2)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 shadow-[0_2px_10px_-2px_rgba(236,72,153,0.3)]">
                  {profile?.avatarUrl ? (
                    <AvatarImage src={profile.avatarUrl} alt={profile?.name} />
                  ) : (
                    <AvatarFallback className="text-2xl bg-pink-200 text-pink-700">
                      {profile?.name ? getInitials(profile.name) : 'ME'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{profile?.name || 'My Profile'}</h1>
                  <p className="text-gray-500">{profile?.email}</p>
                  {profile?.lastAssessment && (
                    <p className="text-sm text-gray-400 mt-1">
                      Last assessment: {formatDate(profile.lastAssessment)}
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="ml-auto"
                  onClick={() => router.push('/me/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="history" className="space-y-4">
            <TabsList className="bg-white/90 backdrop-blur-sm shadow-[0_2px_10px_-2px_rgba(236,72,153,0.15)]">
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                Assessment History
              </TabsTrigger>
              <TabsTrigger value="current">
                <FileText className="h-4 w-4 mr-2" />
                Current Assessment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <Card className="bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(236,72,153,0.2)]">
                <CardHeader>
                  <CardTitle>Assessment History</CardTitle>
                  <CardDescription>View and manage your previous assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  {assessmentHistory.length > 0 ? (
                    <div className="space-y-4">
                      {assessmentHistory.map((assessment, index) => (
                        <Card key={index} className="bg-white shadow-[0_2px_10px_-2px_rgba(236,72,153,0.15)]">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  Assessment from {formatDate(assessment.date)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Risk Level: <span className={`font-medium ${
                                    assessment.result.riskLevel === 'High' ? 'text-red-600' :
                                    assessment.result.riskLevel === 'Medium' ? 'text-yellow-600' :
                                    'text-green-600'
                                  }`}>{assessment.result.riskLevel}</span>
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.push(`/assessment/edit/${index}`)}
                              >
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Assessments Yet</h3>
                      <p className="text-gray-500 mt-2">Complete your first assessment to see it here.</p>
                      <Button
                        className="mt-4"
                        onClick={() => router.push('/assessment')}
                      >
                        Take Assessment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="current">
              <Card className="bg-white/90 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(236,72,153,0.2)]">
                <CardHeader>
                  <CardTitle>Current Assessment</CardTitle>
                  <CardDescription>View and edit your most recent assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  {assessmentHistory.length > 0 ? (
                    <div>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 shadow-[0_2px_10px_-2px_rgba(236,72,153,0.1)]">
                        {JSON.stringify(assessmentHistory[0].data, null, 2)}
                      </pre>
                      <Button
                        className="mt-4"
                        onClick={() => router.push('/assessment/edit/latest')}
                      >
                        Update Assessment
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Current Assessment</h3>
                      <p className="text-gray-500 mt-2">Take an assessment to see your results here.</p>
                      <Button
                        className="mt-4"
                        onClick={() => router.push('/assessment')}
                      >
                        Take Assessment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
} 