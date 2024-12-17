import React from 'react';
import { Phone } from '../types/phone';
import { PhoneCard } from './PhoneCard';
import { phones } from '../data/phones';

interface SimilarPhonesProps {
  basePhone: Phone;
  excludePhones: string[];
}

export const SimilarPhones: React.FC<SimilarPhonesProps> = ({ basePhone, excludePhones }) => {
  const priceRange = 5000; // Price range of ±5000
  const similarPhones = phones.filter(
    (phone) =>
      !excludePhones.includes(phone.id) &&
      Math.abs(phone.price - basePhone.price) <= priceRange
  );

  if (similarPhones.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
        Similar Phones in This Price Range
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similarPhones.map((phone) => (
          <div key={phone.id} className="transform scale-90">
            <PhoneCard phone={phone} />
          </div>
        ))}
      </div>
    </div>
  );
};