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

export interface FilterOptions {
  regions: string[];
  industries: string[];
  years: number[];
}