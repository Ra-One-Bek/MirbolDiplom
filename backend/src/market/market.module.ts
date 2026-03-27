import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { MarketEntity } from './market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketEntity])],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}