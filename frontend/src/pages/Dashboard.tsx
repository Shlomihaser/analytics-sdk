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
          value={totalEvents?.count?.toLocaleString() || '0'}
          trend={totalEvents?.trend}
          icon={<BarChart3 className="w-6 h-6" />}
          isLoading={loadingTotalEvents}
        />
        
        <MetricCard
          title="Total Users"
          value={totalUsers?.count?.toLocaleString() || '0'}
          trend={totalUsers?.trend}
          icon={<Users className="w-6 h-6" />}
          isLoading={loadingTotalUsers}
        />
        
        <MetricCard
          title="Avg Events/User"
          value={avgEvents?.average?.toFixed(2) || '0.00'}
          trend={avgEvents?.trend}
          icon={<Activity className="w-6 h-6" />}
          isLoading={loadingAvgEvents}
        />
        
        <MetricCard
          title="User Retention"
          value={retention?.rate?.toFixed(1) || '0.0'}
          suffix="%"
          trend={retention?.trend}
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

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Real-time Analytics
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          All charts and metrics are updated automatically every 30 seconds to provide you with the most current insights into your application's performance and user behavior.
        </p>
      </div>
    </div>
  );
};