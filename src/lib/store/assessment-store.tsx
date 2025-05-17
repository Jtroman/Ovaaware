'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { RiskAssessmentOutput } from '@/ai/flows/risk-assessment';

interface AssessmentStoreContextType {
  assessmentResults: RiskAssessmentOutput | null;
  setAssessmentResults: (results: RiskAssessmentOutput | null) => void;
}

const AssessmentStoreContext = createContext<AssessmentStoreContextType | undefined>(undefined);

export function AssessmentStoreProvider({ children }: { children: ReactNode }) {
  const [assessmentResults, setAssessmentResults] = useState<RiskAssessmentOutput | null>(null);

  const value = {
    assessmentResults,
    setAssessmentResults,
  };

  return (
    <AssessmentStoreContext.Provider value={value}>
      {children}
    </AssessmentStoreContext.Provider>
  );
}

export function useAssessmentStore() {
  const context = useContext(AssessmentStoreContext);
  if (context === undefined) {
    throw new Error('useAssessmentStore must be used within an AssessmentStoreProvider');
  }
  return context;
}

const saveAssessment = (data: RiskAssessmentInput, result: any) => {
  const history = JSON.parse(localStorage.getItem('assessmentHistory') || '[]');
  history.unshift({
    date: new Date(),
    data,
    result
  });
  localStorage.setItem('assessmentHistory', JSON.stringify(history));
}; 