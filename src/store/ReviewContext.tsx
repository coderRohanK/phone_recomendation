import React, { createContext } from 'react';
import { Review } from '../types/review';
import { useReviewState } from './useReviewState';

interface ReviewContextType {
  addReview: (phoneId: string, review: Omit<Review, 'id' | 'date'>) => void;
  getReviews: (phoneId: string) => Review[];
}

export const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { reviews, addReview, getReviews } = useReviewState();

  return (
    <ReviewContext.Provider value={{ addReview, getReviews }}>
      {children}
    </ReviewContext.Provider>
  );
};