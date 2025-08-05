import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  lines = 1 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 last:mb-0"
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
      </div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
    </div>
  </div>
);

export const ChartSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6"></div>
      <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);