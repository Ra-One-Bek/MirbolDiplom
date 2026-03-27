import type {
    DashboardStats,
    IndustryDistributionItem,
    MarketDataItem,
    RegionStatsItem,
    YearlyTrendItem,
} from '../types/market.types';

export const dashboardStatsMock: DashboardStats = {
  totalCompanies: 12540,
  totalRevenue: 987500000,
  totalEmployees: 76420,
  averageGrowth: 12.4,
};

export const yearlyTrendMock: YearlyTrendItem[] = [
  { year: 2020, companies: 8200, revenue: 540000000 },
  { year: 2021, companies: 9100, revenue: 630000000 },
  { year: 2022, companies: 10200, revenue: 710000000 },
  { year: 2023, companies: 11300, revenue: 840000000 },
  { year: 2024, companies: 12540, revenue: 987500000 },
];

export const industryDistributionMock: IndustryDistributionItem[] = [
  { name: 'Торговля', value: 35 },
  { name: 'Услуги', value: 25 },
  { name: 'Производство', value: 18 },
  { name: 'IT', value: 12 },
  { name: 'Строительство', value: 10 },
];

export const regionStatsMock: RegionStatsItem[] = [
  { region: 'Ташкент', companies: 4200 },
  { region: 'Самарканд', companies: 2100 },
  { region: 'Бухара', companies: 1600 },
  { region: 'Андижан', companies: 1450 },
  { region: 'Фергана', companies: 1300 },
];

export const marketTableMock: MarketDataItem[] = [
  {
    id: 1,
    region: 'Ташкент',
    industry: 'IT',
    year: 2024,
    companyCount: 1200,
    revenue: 185000000,
    employeeCount: 8500,
    growthRate: 15.2,
  },
  {
    id: 2,
    region: 'Самарканд',
    industry: 'Торговля',
    year: 2024,
    companyCount: 1800,
    revenue: 142000000,
    employeeCount: 10400,
    growthRate: 10.8,
  },
  {
    id: 3,
    region: 'Бухара',
    industry: 'Производство',
    year: 2024,
    companyCount: 950,
    revenue: 118000000,
    employeeCount: 7600,
    growthRate: 9.4,
  },
  {
    id: 4,
    region: 'Андижан',
    industry: 'Услуги',
    year: 2024,
    companyCount: 1100,
    revenue: 97000000,
    employeeCount: 6900,
    growthRate: 11.7,
  },
  {
    id: 5,
    region: 'Фергана',
    industry: 'Строительство',
    year: 2024,
    companyCount: 860,
    revenue: 76000000,
    employeeCount: 5400,
    growthRate: 8.9,
  },
];