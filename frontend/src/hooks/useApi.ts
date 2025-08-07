import { useQuery } from '@tanstack/react-query';
import { statisticsApi, eventsApi } from '../services/api';
import { FilterOptions } from '../types';

export const useEvents = (filters?: FilterOptions) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      try {
        return await eventsApi.getEvents(filters);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        return { events: [], total: 0, page: 1, limit: 20 };
      }
    },

  });
};

export const useTotalEvents = () => {
  return useQuery({
    queryKey: ['statistics', 'total-events'],
    queryFn: async () => {
      try {
        return await statisticsApi.getTotalEvents();
      } catch (error) {
        console.error('Failed to fetch total events:', error);
        return { count: 0 };
      }
    },

  });
};

export const useTotalUsers = () => {
  return useQuery({
    queryKey: ['statistics', 'total-users'],
    queryFn: async () => {
      try {
        return await statisticsApi.getTotalUsers();
      } catch (error) {
        console.error('Failed to fetch total users:', error);
        return { count: 0 };
      }
    },

  });
};

export const useAverageEventsPerUser = () => {
  return useQuery({
    queryKey: ['statistics', 'average-events-per-user'],
    queryFn: async () => {
      try {
        return await statisticsApi.getAverageEventsPerUser();
      } catch (error) {
        console.error('Failed to fetch average events per user:', error);
        return { average: 0 };
      }
    },

  });
};

export const useUserRetentionRate = () => {
  return useQuery({
    queryKey: ['statistics', 'user-retention-rate'],
    queryFn: async () => {
      try {
        return await statisticsApi.getUserRetentionRate();
      } catch (error) {
        console.error('Failed to fetch user retention rate:', error);
        return { rate: 0 };
      }
    },

  });
};

export const useEventsByType = () => {
  return useQuery({
    queryKey: ['statistics', 'events-by-type'],
    queryFn: async () => {
      try {
        return await statisticsApi.getEventsByType();
      } catch (error) {
        console.error('Failed to fetch events by type:', error);
        return [];
      }
    },

  });
};

export const useEventsByMonth = () => {
  return useQuery({
    queryKey: ['statistics', 'events-by-month'],
    queryFn: async () => {
      try {
        return await statisticsApi.getEventsByMonth();
      } catch (error) {
        console.error('Failed to fetch events by month:', error);
        return [];
      }
    },

  });
};

export const useTopUsers = () => {
  return useQuery({
    queryKey: ['statistics', 'top-users'],
    queryFn: async () => {
      try {
        return await statisticsApi.getTopUsers();
      } catch (error) {
        console.error('Failed to fetch top users:', error);
        return [];
      }
    },

  });
};