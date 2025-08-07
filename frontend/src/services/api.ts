import axios from 'axios';
import {
  EventsResponse,
  EventsByType,
  EventsByMonth,
  TopUser,
  UserRetention,
  EventsPerUserDistribution,
  DailyEventsPerUser,
  FilterOptions
} from '../types';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Add request interceptor
api.interceptors.request.use((config) => {
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const eventsApi = {
  getEvents: async (filters?: FilterOptions): Promise<EventsResponse> => {
    const params = new URLSearchParams();
    
    // Convert date strings to ISO datetime format for the backend
    if (filters?.startDate) {
      const startDateTime = `${filters.startDate}T00:00:00Z`;
      params.append('startDate', startDateTime);
    }
    if (filters?.endDate) {
      const endDateTime = `${filters.endDate}T23:59:59Z`;
      params.append('endDate', endDateTime);
    }
    
    if (filters?.eventType) params.append('eventType', filters.eventType);
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.metadata) params.append('metadata', filters.metadata);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/api/events?${params.toString()}`);
    return response.data;
  },

  exportEvents: async (filters?: FilterOptions, format: 'csv' | 'json' | 'xlsx' = 'csv') => {
    const params = new URLSearchParams();
    
    // Convert date strings to ISO datetime format for the backend
    if (filters?.startDate) {
      const startDateTime = `${filters.startDate}T00:00:00Z`;
      params.append('startDate', startDateTime);
    }
    if (filters?.endDate) {
      const endDateTime = `${filters.endDate}T23:59:59Z`;
      params.append('endDate', endDateTime);
    }
    
    if (filters?.eventType) params.append('eventType', filters.eventType);
    if (filters?.userId) params.append('userId', filters.userId);
    params.append('format', format);
    
    const response = await api.get(`/api/events/export?${params.toString()}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};

export const statisticsApi = {
  getTotalEvents: async (): Promise<{ count: number }> => {
    const response = await api.get('/api/statistics/total-events');
    return response.data;
  },

  getTotalUsers: async (): Promise<{ count: number }> => {
    const response = await api.get('/api/statistics/total-users');
    return response.data;
  },

  getAverageEventsPerUser: async (): Promise<{ average: number }> => {
    const response = await api.get('/api/statistics/average-events-per-user');
    return response.data;
  },

  getUserRetentionRate: async (): Promise<{ rate: number }> => {
    const response = await api.get('/api/statistics/user-retention-rate');
    return response.data;
  },

  getEventsByType: async (): Promise<EventsByType[]> => {
    const response = await api.get('/api/statistics/events-by-type');
    return response.data;
  },

  getEventsByMonth: async (): Promise<EventsByMonth[]> => {
    const response = await api.get('/api/statistics/events-by-month');
    return response.data;
  },

  getTopUsers: async (): Promise<TopUser[]> => {
    const response = await api.get('/api/statistics/top-users');
    return response.data;
  },

  getUserRetention: async (): Promise<UserRetention[]> => {
    const response = await api.get('/api/statistics/user-retention');
    return response.data;
  },

  getEventsPerUserDistribution: async (): Promise<EventsPerUserDistribution[]> => {
    const response = await api.get('/api/statistics/events-per-user-distribution');
    return response.data;
  },

  getDailyEventsPerUser: async (): Promise<DailyEventsPerUser[]> => {
    const response = await api.get('/api/statistics/daily-events-per-user');
    return response.data;
  }
};

