import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ComparisonView } from '../components/ComparisonView';
import { ComparisonDownloadButton } from '../components/ComparisonDownloadButton';
import { useComparison } from '../store/ComparisonContext';
import { ArrowLeft } from 'lucide-react';

export const Compare = () => {
  const navigate = useNavigate();
  const { recommendedPhone, comparisonPhone } = useComparison();

  if (!recommendedPhone || !comparisonPhone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Please select phones to compare
          </h1>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between animate-fadeIn">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 text-transparent bg-clip-text">
            Phone Comparison
          </h1>
          <ComparisonDownloadButton 
            phone1={recommendedPhone} 
            phone2={comparisonPhone} 
          />
        </div>

        <ComparisonView
          recommendedPhone={recommendedPhone}
          comparisonPhone={comparisonPhone}
        />
      </div>
      <Footer />
    </div>
  );
};