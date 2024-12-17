import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { calculateViabilityYears } from '../utils/viabilityCalculator';
import { Phone } from '../types/phone';

interface PhoneViabilityProps {
  phone: Phone;
}

export const PhoneViability: React.FC<PhoneViabilityProps> = ({ phone }) => {
  const [viabilityYears, setViabilityYears] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateViability = async () => {
      const years = await calculateViabilityYears(phone);
      setViabilityYears(years);
      setLoading(false);
    };

    calculateViability();
  }, [phone]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg animate-pulse">
        <div className="w-5 h-5 bg-blue-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-blue-200 rounded w-3/4"></div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div className="bg-blue-200 h-2 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
      <Clock className="w-5 h-5 text-blue-500" />
      <div>
        <span className="text-sm font-medium text-gray-700">
          Estimated Viability: {viabilityYears} years
        </span>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(viabilityYears / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};