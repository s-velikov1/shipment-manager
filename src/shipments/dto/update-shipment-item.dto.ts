import { IsDecimal, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateShipmentItemDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsDecimal()
  weight_per_unit: number;

  @IsOptional()
  @IsDecimal()
  volume_per_unit: number;

  @IsOptional()
  @IsDecimal()
  height: number;

  @IsOptional()
  @IsDecimal()
  width: number;
}
