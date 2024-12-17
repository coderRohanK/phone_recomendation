import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Review } from '../types/review';
import { ReviewForm } from './reviews/ReviewForm';
import { ReviewList } from './reviews/ReviewList';
import { ReviewStats } from './reviews/ReviewStats';
import { useReviews } from '../hooks/useReviews';

interface ReviewSectionProps {
  reviews: Review[];
  phoneId: string;  // Add phoneId prop
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, phoneId }) => {
  const [showForm, setShowForm] = useState(false);
  const { addReview } = useReviews();  // Get addReview from context

  const handleSubmit = (review: Omit<Review, 'id' | 'date'>) => {
    addReview(phoneId, review);  // Pass phoneId to addReview
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
}