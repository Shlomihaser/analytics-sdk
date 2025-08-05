export interface Event {
  id: string;
  userId: string;
  eventType: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface EventsResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
}

export interface EventsByType {
  eventType: string;
  count: number;
}

export interface EventsByMonth {
  month: string;
  count: number;
}

export interface TopUser {
  userId: string;
  userName?: string;
  eventCount: number;
}

export interface UserRetention {
  period: string;
  retentionRate: number;
}

export interface EventsPerUserDistribution {
  bucket: string;
  count: number;
}

export interface DailyEventsPerUser {
  userId: string;
  date: string;
  eventCount: number;
}

export interface FilterOptions {
  startDate?: string;
  endDate?: string;
  eventType?: string;
  userId?: string;
  metadata?: string;
  page?: number;
  limit?: number;
}

export interface Statistics {
  totalEvents: number;
  totalUsers: number;
  averageEventsPerUser: number;
  userRetentionRate: number;
}