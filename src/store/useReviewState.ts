import { useState, useEffect } from 'react';
import { Review } from '../types/review';
import { loadReviews, saveReviews, generateRandomReviews } from '../utils/reviewStorage';
import { phones } from '../data/phones';

export const useReviewState = () => {
  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const savedReviews = loadReviews();
    
    // Generate random reviews for phones that don't have any
    const initialReviews = { ...savedReviews };
    phones.forEach(phone => {
      if (!initialReviews[phone.id]) {
        initialReviews[phone.id] = generateRandomReviews(phone.id);
      }
    });
    
    // Save the initial reviews if we generated any
    if (Object.keys(initialReviews).length > Object.keys(savedReviews).length) {
      saveReviews(initialReviews);
    }
    
    return initialReviews;
  });

  useEffect(() => {
    saveReviews(reviews);
  }, [reviews]);

  const addReview = (phoneId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    setReviews((prev) => {
      const updatedReviews = {
        ...prev,
        [phoneId]: [...(prev[phoneId] || []), newReview],
      };
      return updatedReviews;
    });
  };

  const getReviews = (phoneId: string) => {
    return reviews[phoneId] || [];
  };

  return { reviews, addReview, getReviews };
};