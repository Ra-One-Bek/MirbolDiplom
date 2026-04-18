export interface MarketDataItem {
  id: number;
  region: string;
  industry: string;
  year: number;
  companyCount: number;
  revenue: number;
  employeeCount: number;
  growthRate: number;
}

export interface DashboardStats {
  totalCompanies: number;
  totalRevenue: number;
  totalEmployees: number;
  averageGrowth: number;
}

export interface IndustryDistributionItem {
  name: string;
  value: number;
}

export interface RegionStatsItem {
  region: string;
  companies: number;
}

export interface YearlyTrendItem {
  year: number;
  companies: number;
  revenue: number;
}

export interface FilterOptions {
  regions: string[];
  industries: string[];
  years: number[];
}

export interface RegionMapItem {
  region: string;
  companies: number;
  revenue: number;
  employees: number;
  growthRate: number;
}