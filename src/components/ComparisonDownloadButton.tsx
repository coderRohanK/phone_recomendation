import React from 'react';
import { Download } from 'lucide-react';
import { Phone } from '../types/phone';
import { generateComparisonPDF } from '../utils/comparisonPdfGenerator';

interface ComparisonDownloadButtonProps {
  phone1: Phone;
  phone2: Phone;
}

export const ComparisonDownloadButton: React.FC<ComparisonDownloadButtonProps> = ({ phone1, phone2 }) => {
  const handleDownload = () => {
    generateComparisonPDF(phone1, phone2);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-600 dark:hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <Download className="w-5 h-5" />
      <span className="font-medium">Download Comparison Report</span>
    </button>
  );
};