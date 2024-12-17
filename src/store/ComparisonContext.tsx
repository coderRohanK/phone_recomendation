import React, { createContext, useContext, useState } from 'react';
import { Phone } from '../types/phone';

interface ComparisonContextType {
  recommendedPhone: Phone | null;
  comparisonPhone: Phone | null;
  setRecommendedPhone: (phone: Phone) => void;
  setComparisonPhone: (phone: Phone) => void;
  clearComparison: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recommendedPhone, setRecommendedPhone] = useState<Phone | null>(null);
  const [comparisonPhone, setComparisonPhone] = useState<Phone | null>(null);

  const clearComparison = () => {
    setRecommendedPhone(null);
    setComparisonPhone(null);
  };

  return (
    <ComparisonContext.Provider
      value={{
        recommendedPhone,
        comparisonPhone,
        setRecommendedPhone,
        setComparisonPhone,
        clearComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};