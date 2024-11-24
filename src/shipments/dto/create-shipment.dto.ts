import {
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ShipmentType } from 'src/common/enums/shipment-type.enum';

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ShipmentType)
  type: ShipmentType;

  @IsISO31661Alpha2()
  origin_country: string;

  @IsISO31661Alpha2()
  destination_country: string;
}
