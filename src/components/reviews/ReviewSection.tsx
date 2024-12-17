import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Review } from '../../types/review';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { ReviewStats } from './ReviewStats';

interface ReviewSectionProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, onAddReview }) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (review: Omit<Review, 'id' | 'date'>) => {
    onAddReview(review);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Reviews ({reviews.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      <ReviewStats reviews={reviews} />

      {showForm && (
        <ReviewForm
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ReviewList reviews={reviews} />
    </div>
  );
};