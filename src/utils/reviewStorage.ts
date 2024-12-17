import { Review } from '../types/review';

const REVIEWS_STORAGE_KEY = 'phone_reviews';

export const loadReviews = (): Record<string, Review[]> => {
  const savedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
  return savedReviews ? JSON.parse(savedReviews) : {};
};

export const saveReviews = (reviews: Record<string, Review[]>): void => {
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
};

const reviewComments = [
  "Great phone with excellent camera quality!",
  "Battery life is impressive, lasts all day.",
  "Good value for money, recommended.",
  "Smooth performance for daily tasks.",
  "Display quality is outstanding.",
  "Fast charging is a great feature.",
  "Camera could be better, but overall good phone.",
  "Premium build quality, feels great in hand.",
  "Gaming performance is excellent.",
  "Good phone for the price point."
];

const userNames = [
  "John D.",
  "Sarah M.",
  "Mike R.",
  "Emily K.",
  "David L.",
  "Lisa P.",
  "Alex S.",
  "Emma T.",
  "Chris B.",
  "Anna W."
];

export const generateRandomReviews = (phoneId: string, count: number = 5): Review[] => {
  const reviews: Review[] = [];
  
  for (let i = 0; i < count; i++) {
    const rating = Math.floor(Math.random() * 3) + 3; // Ratings between 3-5
    const review: Review = {
      id: crypto.randomUUID(),
      userName: userNames[Math.floor(Math.random() * userNames.length)],
      rating,
      comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Random date within last 30 days
    };
    reviews.push(review);
  }
  
  return reviews;
};