import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../../types/review';

interface ReviewStatsProps {
  reviews: Review[];
}

export const ReviewStats: React.FC<ReviewStatsProps> = ({ reviews }) => {
  if (reviews.length === 0) return null;

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          {averageRating.toFixed(1)}
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= averageRating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Based on {reviews.length} reviews
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <div className="text-sm text-gray-600 dark:text-gray-400 w-8">
              {rating} ★
            </div>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400"
                style={{
                  width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%`,
                }}
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 w-8">
              {ratingCounts[rating] || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};