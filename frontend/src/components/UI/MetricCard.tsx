import React from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';

interface MetricCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  suffix = '',
  icon,
  isLoading = false,
  className = ''
}) => {
  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ${className}`}>
        <LoadingSkeleton lines={3} />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        {icon && (
          <div className="text-blue-500 dark:text-blue-400">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}{suffix}
          </p>
        </div>
      </div>
    </div>
  );
};