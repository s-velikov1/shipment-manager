import {
  IsEnum,
  IsISO31661Alpha2,
  IsOptional,
  IsString,
} from 'class-validator';
import { ShipmentType } from 'src/common/enums/shipment-type.enum';

export class UpdateShipmentDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(ShipmentType)
  type: ShipmentType;

  @IsOptional()
  @IsISO31661Alpha2()
  origin_country: string;

  @IsOptional()
  @IsISO31661Alpha2()
  destinaton_country: string;
}
