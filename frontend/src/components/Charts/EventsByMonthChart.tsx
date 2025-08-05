import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEventsByMonth } from '../../hooks/useApi';
import { ChartSkeleton } from '../UI/LoadingSkeleton';
import { format, parseISO } from 'date-fns';
import { useSettings } from '../../context/SettingsContext';

export const EventsByMonthChart: React.FC = () => {
  const { data, isLoading, error } = useEventsByMonth();
  const { chartAnimationsEnabled } = useSettings();

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Events Trend
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
          Monthly Events Trend
        </h3>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No monthly data available
        </div>
      </div>
    );
  }

  const formattedData = data?.map(item => ({
    ...item,
    monthLabel: format(parseISO(item.month + '-01'), 'MMM yyyy')
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-blue-600 dark:text-blue-400">
            Events: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Events Trend
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="monthLabel" 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              domain={[0, formattedData?.length === 1 ? 'dataMax + 5' : 'dataMax + 2']}
              allowDecimals={false}
              tickCount={formattedData?.length === 1 ? 4 : 6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
              connectNulls={false}
              animationBegin={0}
              animationDuration={chartAnimationsEnabled ? 1000 : 0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};