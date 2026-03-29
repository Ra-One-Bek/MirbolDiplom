import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketModule } from './market/market.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketEntity } from './market/market.entity';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ТВОЙ_ПАРОЛЬ',
      database: 'msb_market',
      entities: [MarketEntity, UserEntity],
      synchronize: true,
    }),
    AuthModule,
    MarketModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
