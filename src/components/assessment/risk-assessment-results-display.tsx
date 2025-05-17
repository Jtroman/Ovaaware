"use client";

import type { RiskAssessmentOutput } from '@/ai/flows/risk-assessment';
import { EnhancedDashboard } from './enhanced-dashboard';

interface RiskAssessmentResultsDisplayProps {
  results: RiskAssessmentOutput;
}

export function RiskAssessmentResultsDisplay({ results }: RiskAssessmentResultsDisplayProps) {
  // Convert the risk score to a multiplier format
  const riskMultiplier = parseFloat((results.riskScore / 1.0).toFixed(2));
  
  const riskData = {
    multiplier: riskMultiplier,
    userRisk: 2, // These values should come from your risk calculation
    averageRisk: 19, // These values should come from your risk calculation
  };

  return <EnhancedDashboard riskData={riskData} />;
}
