import { useQuery } from '@tanstack/react-query';
import { statisticsApi, eventsApi, mockData } from '../services/api';
import { FilterOptions } from '../types';

const USE_MOCK_DATA = false; // Toggle for development - temporarily true due to MongoDB connection issues

export const useEvents = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.events;
      }
      try {
        return await eventsApi.getEvents(filters);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        return { events: [], total: 0, page: 1, limit: 20 };
      }
    },
    staleTime: 300000, // 5 minutes - data stays fresh longer
  });
};

export const useTotalEvents = () => {
  return useQuery({
    queryKey: ['statistics', 'total-events'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockData.statistics.totalEvents;
      }
      try {
        return await statisticsApi.getTotalEvents();
      } catch (error) {
        console.error('Failed to fetch total events:', error);
        return { count: 0, trend: 0 };
      }
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useTotalUsers = () => {
  return useQuery({
    queryKey: ['statistics', 'total-users'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockData.statistics.totalUsers;
      }
      try {
        return await statisticsApi.getTotalUsers();
      } catch (error) {
        console.error('Failed to fetch total users:', error);
        return { count: 0, trend: 0 };
      }
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useAverageEventsPerUser = () => {
  return useQuery({
    queryKey: ['statistics', 'average-events-per-user'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockData.statistics.averageEventsPerUser;
      }
      try {
        return await statisticsApi.getAverageEventsPerUser();
      } catch (error) {
        console.error('Failed to fetch average events per user:', error);
        return { average: 0, trend: 0 };
      }
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useUserRetentionRate = () => {
  return useQuery({
    queryKey: ['statistics', 'user-retention-rate'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockData.statistics.userRetentionRate;
      }
      try {
        return await statisticsApi.getUserRetentionRate();
      } catch (error) {
        console.error('Failed to fetch user retention rate:', error);
        return { rate: 0, trend: 0 };
      }
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useEventsByType = () => {
  return useQuery({
    queryKey: ['statistics', 'events-by-type'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.eventsByType;
      }
      try {
        return await statisticsApi.getEventsByType();
      } catch (error) {
        console.error('Failed to fetch events by type:', error);
        return [];
      }
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useEventsByMonth = () => {
  return useQuery({
    queryKey: ['statistics', 'events-by-month'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.eventsByMonth;
      }
      try {
        return await statisticsApi.getEventsByMonth();
      } catch (error) {
        console.error('Failed to fetch events by month:', error);
        return [];
      }
    },
    staleTime: 300000, // 5 minutes
  });
};

export const useTopUsers = () => {
  return useQuery({
    queryKey: ['statistics', 'top-users'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.topUsers;
      }
      try {
        return await statisticsApi.getTopUsers();
      } catch (error) {
        console.error('Failed to fetch top users:', error);
        return [];
      }
    },
    staleTime: 300000, // 5 minutes
  });
};