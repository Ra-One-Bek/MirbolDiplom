import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  getAllMarketData() {
    return this.marketService.getAllMarketData();
  }

  @Get('stats')
  getDashboardStats() {
    return this.marketService.getDashboardStats();
  }

  @Get('analytics')
  getAnalytics(@Query() query: AnalyticsQueryDto) {
    return this.marketService.getAnalytics(query);
  }

  @Get('filters')
  getFilterOptions() {
    return this.marketService.getFilterOptions();
  }

  @Post()
  create(@Body() body: CreateMarketDto) {
    return this.marketService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateMarketDto) {
    return this.marketService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketService.remove(Number(id));
  }
}