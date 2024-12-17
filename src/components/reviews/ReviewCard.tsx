import React from 'react';
import { Review } from '../../types/review';
import { StarRating } from './StarRating';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900 dark:text-gray-100">{review.userName}</h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center mb-3">
        <StarRating rating={review.rating} />
      </div>
      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
    </div>
  );
};