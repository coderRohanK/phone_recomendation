import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'sm',
  interactive = false,
  onChange,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const renderStar = (index: number) => {
    const starSize = sizeClasses[size];
    const isFullStar = index < Math.floor(rating);
    const isHalfStar = !isFullStar && index === Math.floor(rating) && rating % 1 >= 0.5;

    if (isFullStar) {
      return <Star key={index} className={`${starSize} fill-yellow-400 text-yellow-400`} />;
    } else if (isHalfStar) {
      return <StarHalf key={index} className={`${starSize} text-yellow-400`} />;
    } else {
      return <StarOff key={index} className={`${starSize} text-gray-300 dark:text-gray-600`} />;
    }
  };

  return (
    <div className="flex gap-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <button
          key={index}
          type="button"
          onClick={() => interactive && onChange?.(index + 1)}
          className={`focus:outline-none ${
            interactive ? 'transition-transform hover:scale-110' : ''
          }`}
          disabled={!interactive}
        >
          {renderStar(index)}
        </button>
      ))}
    </div>
  );
};