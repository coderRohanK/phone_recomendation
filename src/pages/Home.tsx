import React, { useState, useCallback } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { StarRating } from '../components/StarRating';
import { PriceRangeInput } from '../components/PriceRangeInput';
import { PhoneCard } from '../components/PhoneCard';
import { RadarChart } from '../components/RadarChart';
import { phones } from '../data/phones';
import { getRecommendations } from '../utils/recommendations';
import { Phone, UserPreferences } from '../types/phone';
import { useComparison } from '../store/ComparisonContext';
import { usePreferences } from '../store/PreferencesContext';

export const Home = () => {
  const [step, setStep] = useState<'preferences' | 'results'>('preferences');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Phone[]>([]);
  const { preferences, setPreferences } = usePreferences();

  const { setRecommendedPhone } = useComparison();
  const mainRecommendation = recommendations[0];

  const handleGetRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const results = await getRecommendations(phones, preferences);
      setRecommendations(results);
      if (results.length > 0) {
        setRecommendedPhone(results[0]);
      }
      setStep('results');
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, [preferences, setRecommendedPhone]);

  const renderPreferences = () => (
    <div className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 text-transparent bg-clip-text">
        Set Your Preferences
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StarRating
          label="Camera Importance"
          value={preferences.camera}
          onChange={(value) =>
            setPreferences((prev) => ({ ...prev, camera: value }))
          }
        />
        <StarRating
          label="Storage Importance"
          value={preferences.storage}
          onChange={(value) =>
            setPreferences((prev) => ({ ...prev, storage: value }))
          }
        />
        <StarRating
          label="Processor Importance"
          value={preferences.processor}
          onChange={(value) =>
            setPreferences((prev) => ({ ...prev, processor: value }))
          }
        />
        <StarRating
          label="Battery Importance"
          value={preferences.battery}
          onChange={(value) =>
            setPreferences((prev) => ({ ...prev, battery: value }))
          }
        />
      </div>
      <PriceRangeInput
        minPrice={preferences.minPrice}
        maxPrice={preferences.maxPrice}
        onMinChange={(value) =>
          setPreferences((prev) => ({ ...prev, minPrice: value }))
        }
        onMaxChange={(value) =>
          setPreferences((prev) => ({ ...prev, maxPrice: value }))
        }
      />
      <button
        onClick={handleGetRecommendations}
        disabled={loading}
        className={`w-full py-4 px-6 bg-gradient-to-r from-violet-500 to-purple-500 dark:from-violet-600 dark:to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-600 dark:hover:from-violet-700 dark:hover:to-purple-700 transition-all transform hover:scale-[1.02] font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
      >
        {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
      </button>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 text-transparent bg-clip-text">
          Your Recommendations
        </h2>
        <button
          onClick={() => setStep('preferences')}
          className="px-6 py-2 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
        >
          Adjust Preferences
        </button>
      </div>

      {mainRecommendation ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="transform scale-75 origin-top">
              <PhoneCard 
                phone={mainRecommendation} 
                isMainCard={true} 
                hideCompare={true}
                showFeedback={true}
              />
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Specifications Overview</h3>
            <div className="aspect-square w-full max-w-md mx-auto transform scale-75 origin-center">
              <RadarChart basePhone={mainRecommendation} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          No recommendations found for your preferences
        </div>
      )}

      {recommendations.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendations.slice(1).map((phone) => (
            <div key={phone.id} className="transform scale-90">
              <PhoneCard 
                phone={phone} 
                showFeedback={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 text-transparent bg-clip-text animate-fadeIn">
          Find Your Perfect Phone
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto animate-fadeIn">
          Tell us your preferences and let us find the perfect smartphone for you
        </p>

        {step === 'preferences' ? renderPreferences() : renderResults()}
      </div>
      <Footer />
    </div>
  );
};