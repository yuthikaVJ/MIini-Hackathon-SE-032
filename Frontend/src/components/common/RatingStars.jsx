import React from 'react';
import { Star } from 'lucide-react';

function RatingStars({ rating = 0, reviewCount, showScore = true, size = 16 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const totalStars = 5;

  return (
    <div className="rating-container">
      <div className="rating-stars" style={{ display: 'flex', gap: '2px' }}>
        {[...Array(totalStars)].map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= fullStars;
          const isHalf = starNumber === fullStars + 1 && hasHalfStar;

          return (
            <Star
              key={index}
              size={size}
              fill={isFilled || isHalf ? 'var(--color-rating)' : 'none'}
              color={isFilled || isHalf ? 'var(--color-rating)' : 'var(--color-border-medium)'}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showScore && <span className="rating-text">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="rating-reviews">({reviewCount})</span>
      )}
    </div>
  );
}

export default RatingStars;
