import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ShipmentItemService } from '../services/shipment-item.service';
import { CreateShipmentItemDto } from '../dto/create-shipment-item.dto';
import { UpdateShipmentItemDto } from '../dto/update-shipment-item.dto';

@Controller('shipments/:shipmentId/items')
export class ShipmentItemController {
  constructor(private readonly shipmentItemService: ShipmentItemService) {}

  @Get()
  async getAll(@Param('shipmentId', new ParseUUIDPipe()) shipmentId: string) {
    console.log(shipmentId);
    return await this.shipmentItemService.getAllByShipment(shipmentId);
  }

  @Get(':itemId')
  async getOne(
    @Param('shipmentId', new ParseUUIDPipe()) shipmentId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    return await this.shipmentItemService.getOneByIdAndShipment(
      shipmentId,
      itemId,
    );
  }

  @Post()
  async create(
    @Param('shipmentId', new ParseUUIDPipe()) shipmentId: string,
    @Body() createShipmentItemDto: CreateShipmentItemDto,
  ) {
    return await this.shipmentItemService.create(
      shipmentId,
      createShipmentItemDto,
    );
  }

  @Patch(':itemId')
  async update(
    @Param('shipmentId', new ParseUUIDPipe()) shipmentId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
    @Body() updateShipmenentItemDto: UpdateShipmentItemDto,
  ) {
    return await this.shipmentItemService.update(
      shipmentId,
      itemId,
      updateShipmenentItemDto,
    );
  }

  @Delete(':itemId')
  async delete(
    @Param('shipmentId', new ParseUUIDPipe()) shipmentId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    return await this.shipmentItemService.softDelete(shipmentId, itemId);
  }
}
