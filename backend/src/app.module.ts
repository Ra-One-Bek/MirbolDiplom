import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketEntity } from './market/market.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abiev555',
      database: 'msb_market',
      entities: [MarketEntity],
      synchronize: true, // ВАЖНО: только для разработки
    }),

    MarketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
