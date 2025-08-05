import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { statisticsApi, eventsApi, mockData } from '../services/api';
import { FilterOptions } from '../types';

const USE_MOCK_DATA = true; // Toggle for development

export const useEvents = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockData.events;
      }
      return eventsApi.getEvents(filters);
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Auto-refresh every 30 seconds
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
      return statisticsApi.getTotalEvents();
    },
    staleTime: 30000,
    refetchInterval: 30000,
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
      return statisticsApi.getTotalUsers();
    },
    staleTime: 30000,
    refetchInterval: 30000,
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
      return statisticsApi.getAverageEventsPerUser();
    },
    staleTime: 30000,
    refetchInterval: 30000,
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
      return statisticsApi.getUserRetentionRate();
    },
    staleTime: 30000,
    refetchInterval: 30000,
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
      return statisticsApi.getEventsByType();
    },
    staleTime: 30000,
    refetchInterval: 30000,
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
      return statisticsApi.getEventsByMonth();
    },
    staleTime: 30000,
    refetchInterval: 30000,
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
      return statisticsApi.getTopUsers();
    },
    staleTime: 30000,
    refetchInterval: 30000,
  });
};