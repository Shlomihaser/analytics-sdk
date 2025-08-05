import React from 'react';
import { BarChart3, Users, Activity, TrendingUp } from 'lucide-react';
import { MetricCard } from '../components/UI/MetricCard';
import { EventsByTypeChart } from '../components/Charts/EventsByTypeChart';
import { EventsByMonthChart } from '../components/Charts/EventsByMonthChart';
import { TopUsersChart } from '../components/Charts/TopUsersChart';
import { 
  useTotalEvents, 
  useTotalUsers, 
  useAverageEventsPerUser, 
  useUserRetentionRate 
} from '../hooks/useApi';

// Utility functions for safe number formatting
const safeFormatNumber = (value: any, defaultValue: string = '0'): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return defaultValue;
  }
  return Number(value).toLocaleString();
};

const safeFormatDecimal = (value: any, decimals: number = 2, defaultValue: string = '0.00'): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return defaultValue;
  }
  return Number(value).toFixed(decimals);
};

export const Dashboard: React.FC = () => {
  const { data: totalEvents, isLoading: loadingTotalEvents } = useTotalEvents();
  const { data: totalUsers, isLoading: loadingTotalUsers } = useTotalUsers();
  const { data: avgEvents, isLoading: loadingAvgEvents } = useAverageEventsPerUser();
  const { data: retention, isLoading: loadingRetention } = useUserRetentionRate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your analytics data and key metrics
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Events"
          value={safeFormatNumber(totalEvents?.count)}
          icon={<BarChart3 className="w-6 h-6" />}
          isLoading={loadingTotalEvents}
        />
        
        <MetricCard
          title="Total Users"
          value={safeFormatNumber(totalUsers?.count)}
          icon={<Users className="w-6 h-6" />}
          isLoading={loadingTotalUsers}
        />
        
        <MetricCard
          title="Avg Events/User"
          value={safeFormatDecimal(avgEvents?.average, 2)}
          icon={<Activity className="w-6 h-6" />}
          isLoading={loadingAvgEvents}
        />
        
        <MetricCard
          title="User Retention"
          value={safeFormatDecimal(retention?.rate, 1, '0.0')}
          suffix="%"
          icon={<TrendingUp className="w-6 h-6" />}
          isLoading={loadingRetention}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventsByTypeChart />
        <TopUsersChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <EventsByMonthChart />
      </div>


    </div>
  );
};