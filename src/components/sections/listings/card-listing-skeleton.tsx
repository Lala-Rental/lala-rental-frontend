import React from 'react';
import CarPostingCardSkeleton from '../../cards/card-skeleton.tsx';

interface CardListingSkeletonProps {
  numberOfCards: number;
  numberOfColumns?: number;
}

const CardListingSkeleton: React.FC<CardListingSkeletonProps> = ({ numberOfCards, numberOfColumns = 4 }) => {
  return (
    <div className={`grid gap-5 sm:max-w-sm sm:mx-auto lg:max-w-full`} style={{ gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))` }}>
      {Array.from({ length: numberOfCards }).map((_, index) => (
        <CarPostingCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardListingSkeleton;