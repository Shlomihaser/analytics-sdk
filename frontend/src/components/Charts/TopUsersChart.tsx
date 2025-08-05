import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTopUsers } from '../../hooks/useApi';
import { ChartSkeleton } from '../UI/LoadingSkeleton';
import { useSettings } from '../../context/SettingsContext';

export const TopUsersChart: React.FC = () => {
  const { data, isLoading, error } = useTopUsers();
  const { chartAnimationsEnabled } = useSettings();

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Users by Events
        </h3>
        <div className="text-center text-red-500 dark:text-red-400">
          Failed to load chart data
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Users by Events
        </h3>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No user data available
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900 dark:text-white">
            {data.userName || data.userId}
          </p>
          <p className="text-purple-600 dark:text-purple-400">
            Events: {data.eventCount.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Top Users by Events
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="userId"
              angle={-45}
              textAnchor="end"
              height={60}
              className="text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              domain={[0, 'dataMax + 1']}
              className="text-gray-600 dark:text-gray-400"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="eventCount" 
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
              stroke="#7C3AED"
              strokeWidth={1}
              animationBegin={0}
              animationDuration={chartAnimationsEnabled ? 800 : 0}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};