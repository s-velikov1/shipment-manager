import { IsEnum, IsOptional } from 'class-validator';
import { ShipmentType } from 'src/common/enums/shipment-type.enum';

export class GetShipmentDto {
  @IsOptional()
  @IsEnum(ShipmentType)
  type: ShipmentType;
}
