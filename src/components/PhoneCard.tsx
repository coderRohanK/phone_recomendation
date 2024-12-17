import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, HardDrive, Cpu, Battery, ShoppingCart, BarChart2, Smartphone, MessageCircle, Star } from 'lucide-react';
import { Phone } from '../types/phone';
import { PhoneViability } from './PhoneViability';
import { PriceHistoryGraph } from './PriceHistoryGraph';
import { ReviewSection } from './ReviewSection';
import { useComparison } from '../store/ComparisonContext';
import { useReviews } from '../hooks/useReviews';
import { getGradientColors } from '../utils/gradients';
import { FeedbackButton } from './FeedbackButton';

interface PhoneCardProps {
  phone: Phone;
  isMainCard?: boolean;
  hideCompare?: boolean;
  showFeedback?: boolean;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({
  phone,
  isMainCard = false,
  hideCompare = false,
  showFeedback = false,
}) => {
  const navigate = useNavigate();
  const { setComparisonPhone } = useComparison();
  const { getReviews } = useReviews();
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const reviews = getReviews(phone.id);
  const gradient = getGradientColors(phone.id);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleCompare = () => {
    setComparisonPhone(phone);
    navigate('/compare');
  };

  const handleShop = () => {
    window.open(phone.shopLinks.amazon, '_blank');
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${isMainCard ? 'transform hover:scale-[1.02]' : ''}`}>
      <div className={`p-6 bg-gradient-to-r ${gradient.from} ${gradient.to} text-white`}>
        <h3 className="text-xl font-semibold mb-2">{phone.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">₹{phone.price.toLocaleString()}</p>
          {averageRating && (
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{averageRating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{phone.specs.cameraMP}MP</span>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{phone.specs.storageGB}GB</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{phone.specs.processorGHz}GHz</span>
          </div>
          <div className="flex items-center gap-2">
            <Battery className="w-5 h-5 text-red-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{phone.specs.batteryMAh}mAh</span>
          </div>
        </div>

        <PhoneViability phone={phone} />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowPriceHistory(!showPriceHistory)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            Price History
          </button>
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Reviews ({reviews.length})
          </button>
        </div>

        {showPriceHistory && (
          <PriceHistoryGraph
            phoneId={phone.id}
            isExpanded={showPriceHistory}
            onToggle={() => setShowPriceHistory(!showPriceHistory)}
          />
        )}

        {showReviews && (
          <ReviewSection
            reviews={reviews}
            phoneId={phone.id}
          />
        )}

        {showFeedback && <FeedbackButton phone={phone} />}

        <div className="flex gap-2 pt-4">
          <button
            onClick={handleShop}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Shop Now
          </button>
          {!hideCompare && (
            <button
              onClick={handleCompare}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              Compare
            </button>
          )}
        </div>
      </div>
    </div>
  );
};