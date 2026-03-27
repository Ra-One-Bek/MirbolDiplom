import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MarketEntity } from './market.entity';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(MarketEntity)
    private readonly marketRepo: Repository<MarketEntity>,
  ) {}

  async getAllMarketData() {
    return this.marketRepo.find();
  }

  async getDashboardStats() {
    const data = await this.marketRepo.find();

    const totalCompanies = data.reduce((sum, item) => sum + item.companyCount, 0);
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalEmployees = data.reduce((sum, item) => sum + item.employeeCount, 0);

    const averageGrowth =
      data.length > 0
        ? Number(
            (
              data.reduce((sum, item) => sum + item.growthRate, 0) /
              data.length
            ).toFixed(1),
          )
        : 0;

    return {
      totalCompanies,
      totalRevenue,
      totalEmployees,
      averageGrowth,
    };
  }

  async getAnalytics(filters: AnalyticsQueryDto) {
    const query = this.marketRepo.createQueryBuilder('market');

    if (filters.region) {
      query.andWhere('market.region = :region', { region: filters.region });
    }

    if (filters.industry) {
      query.andWhere('market.industry = :industry', {
        industry: filters.industry,
      });
    }

    if (filters.year) {
      query.andWhere('market.year = :year', { year: filters.year });
    }

    return query.getMany();
  }

  async getFilterOptions() {
    const data = await this.marketRepo.find();

    const regions = [...new Set(data.map((item) => item.region))];
    const industries = [...new Set(data.map((item) => item.industry))];
    const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a);

    return { regions, industries, years };
  }

  async create(dto: CreateMarketDto) {
    const entity = this.marketRepo.create(dto);
    return this.marketRepo.save(entity);
  }

  async update(id: number, dto: UpdateMarketDto) {
    const item = await this.marketRepo.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException('Запись не найдена');
    }

    Object.assign(item, dto);
    return this.marketRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.marketRepo.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException('Запись не найдена');
    }

    await this.marketRepo.remove(item);
    return item;
  }
}