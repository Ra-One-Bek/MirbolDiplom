import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import type {
  DashboardStats,
  FilterOptions,
  MarketDataItem,
} from '../../types/market.types';

export interface AnalyticsFilters {
  region?: string;
  industry?: string;
  year?: number;
}

export interface CreateMarketPayload {
  region: string;
  industry: string;
  year: number;
  companyCount: number;
  revenue: number;
  employeeCount: number;
  growthRate: number;
}

export type UpdateMarketPayload = Partial<CreateMarketPayload>;

export const marketService = {
  async getAllMarketData(): Promise<MarketDataItem[]> {
    const response = await apiClient.get<MarketDataItem[]>(API_ENDPOINTS.MARKET);
    return response.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>(API_ENDPOINTS.MARKET_STATS);
    return response.data;
  },

  async getAnalytics(filters: AnalyticsFilters): Promise<MarketDataItem[]> {
    const response = await apiClient.get<MarketDataItem[]>(
      API_ENDPOINTS.MARKET_ANALYTICS,
      {
        params: filters,
      }
    );
    return response.data;
  },

  async getAvailableFilters(): Promise<FilterOptions> {
    const response = await apiClient.get<FilterOptions>(API_ENDPOINTS.MARKET_FILTERS);
    return response.data;
  },

  async createMarket(data: CreateMarketPayload): Promise<MarketDataItem> {
    const response = await apiClient.post<MarketDataItem>(API_ENDPOINTS.MARKET, data);
    return response.data;
  },

  async updateMarket(id: number, data: UpdateMarketPayload): Promise<MarketDataItem> {
    const response = await apiClient.put<MarketDataItem>(
      `${API_ENDPOINTS.MARKET}/${id}`,
      data
    );
    return response.data;
  },

  async deleteMarket(id: number): Promise<MarketDataItem> {
    const response = await apiClient.delete<MarketDataItem>(
      `${API_ENDPOINTS.MARKET}/${id}`
    );
    return response.data;
  },
};