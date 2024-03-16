import React, { FC } from 'react';
import './LoadMoreButton.css';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onLoadMore }) => {
  return (
    <div className="p-6 bg-gray-100">
      <button
        className="w-full text-gray-500"
        onClick={onLoadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;