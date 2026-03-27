import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('market_data')
export class MarketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  region: string;

  @Column()
  industry: string;

  @Column()
  year: number;

  @Column()
  companyCount: number;

  @Column('bigint')
  revenue: number;

  @Column()
  employeeCount: number;

  @Column('float')
  growthRate: number;
}