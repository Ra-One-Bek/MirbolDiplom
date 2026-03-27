import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateMarketDto {
  @IsString()
  region: string;

  @IsString()
  industry: string;

  @IsInt()
  year: number;

  @IsInt()
  companyCount: number;

  @IsNumber()
  revenue: number;

  @IsInt()
  employeeCount: number;

  @IsNumber()
  growthRate: number;
}