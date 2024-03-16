import React, { FC } from 'react';
import './LoadMoreButton.css';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onLoadMore }) => {
  return (
    <div className="load-more-btn-container">
      <button
        className="w-full load-more-btn"
        onClick={onLoadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;