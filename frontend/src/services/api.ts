import axios from 'axios';
import {
  Event,
  EventsResponse,
  EventsByType,
  EventsByMonth,
  TopUser,
  UserRetention,
  EventsPerUserDistribution,
  DailyEventsPerUser,
  FilterOptions,
  Statistics
} from '../types';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
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
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.eventType) params.append('eventType', filters.eventType);
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.metadata) params.append('metadata', filters.metadata);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/api/events?${params.toString()}`);
    return response.data;
  },

  exportEvents: async (filters?: FilterOptions, format: 'csv' | 'json' = 'csv') => {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
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
  getTotalEvents: async (): Promise<{ count: number; trend: number }> => {
    const response = await api.get('/api/statistics/total-events');
    return response.data;
  },

  getTotalUsers: async (): Promise<{ count: number; trend: number }> => {
    const response = await api.get('/api/statistics/total-users');
    return response.data;
  },

  getAverageEventsPerUser: async (): Promise<{ average: number; trend: number }> => {
    const response = await api.get('/api/statistics/average-events-per-user');
    return response.data;
  },

  getUserRetentionRate: async (): Promise<{ rate: number; trend: number }> => {
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

// Mock data for development
export const mockData = {
  events: {
    events: [
      {
        id: '1',
        userId: 'user_123',
        eventType: 'page_view',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        metadata: { page: '/dashboard', duration: 45 }
      },
      {
        id: '2',
        userId: 'user_456',
        eventType: 'button_click',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        metadata: { button: 'export', section: 'events' }
      },
      {
        id: '3',
        userId: 'user_789',
        eventType: 'form_submit',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        metadata: { form: 'contact', success: true }
      }
    ],
    total: 1247,
    page: 1,
    limit: 20
  },
  
  statistics: {
    totalEvents: { count: 1247, trend: 12.5 },
    totalUsers: { count: 89, trend: 8.3 },
    averageEventsPerUser: { average: 14.02, trend: 3.7 },
    userRetentionRate: { rate: 78.5, trend: -2.1 }
  },

  eventsByType: [
    { eventType: 'page_view', count: 456 },
    { eventType: 'button_click', count: 234 },
    { eventType: 'form_submit', count: 123 },
    { eventType: 'download', count: 87 },
    { eventType: 'search', count: 65 }
  ],

  eventsByMonth: [
    { month: '2024-01', count: 145 },
    { month: '2024-02', count: 167 },
    { month: '2024-03', count: 189 },
    { month: '2024-04', count: 223 },
    { month: '2024-05', count: 201 },
    { month: '2024-06', count: 234 }
  ],

  topUsers: [
    { userId: 'user_123', userName: 'John Doe', eventCount: 45 },
    { userId: 'user_456', userName: 'Jane Smith', eventCount: 38 },
    { userId: 'user_789', userName: 'Bob Johnson', eventCount: 32 },
    { userId: 'user_101', userName: 'Alice Brown', eventCount: 28 },
    { userId: 'user_202', userName: 'Charlie Wilson', eventCount: 24 }
  ]
};