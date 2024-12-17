import React from 'react';
import { Phone } from '../types/phone';
import { PhoneCard } from './PhoneCard';
import { RadarChart } from './RadarChart';
import { SimilarPhones } from './SimilarPhones';
import { SpecificationComparison } from './SpecificationComparison';

interface ComparisonViewProps {
  recommendedPhone: Phone;
  comparisonPhone: Phone;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  recommendedPhone,
  comparisonPhone,
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Recommended Phone
          </h3>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <PhoneCard phone={recommendedPhone} isMainCard={true} hideCompare={true} />
          </div>
        </div>
        <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Comparison Phone
          </h3>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <PhoneCard phone={comparisonPhone} isMainCard={true} hideCompare={true} />
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg animate-fadeIn" style={{ animationDelay: '200ms' }}>
        <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
          Specifications Comparison
        </h3>
        <div className="aspect-square w-full max-w-2xl mx-auto">
          <RadarChart basePhone={recommendedPhone} comparisonPhone={comparisonPhone} />
        </div>
      </div>

      <SpecificationComparison
        phone1={recommendedPhone}
        phone2={comparisonPhone}
      />

      <SimilarPhones basePhone={recommendedPhone} excludePhones={[recommendedPhone.id, comparisonPhone.id]} />
    </div>
  );
};