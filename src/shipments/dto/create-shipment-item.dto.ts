import { IsDecimal, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateShipmentItemDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsDecimal()
  weight_per_unit: number;

  @IsNotEmpty()
  @IsDecimal()
  volume_per_unit: number;

  @IsNotEmpty()
  @IsDecimal()
  height: number;

  @IsNotEmpty()
  @IsDecimal()
  width: number;
}
