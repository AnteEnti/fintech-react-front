import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div 
        className="text-5xl font-bold text-secondary animate-spin-and-fade"
        aria-label="Loading..."
        role="status"
        aria-live="polite"
      >
        ₹
      </div>
    </div>
  );
};

export default LoadingSpinner;