import React, { ReactNode } from 'react';

interface TooltipProps {
  text: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <div className="relative flex items-center group ml-2">
      <button
        type="button"
        className="cursor-pointer"
        aria-label="More information"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-primary group-focus:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      <div
        role="tooltip"
        className="absolute bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none z-10 -translate-x-1/2 left-1/2"
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
