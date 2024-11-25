import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserExistPipe } from 'src/common/pipes/user-exist.pipe';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';
import { ShipmentService } from '../services/shipment.service';
import { ShipmentOwnershipGuard } from '../guards/shipment-ownership.guard';
import { GetShipmentDto } from '../dto/get-shipment.dto';

@Controller('users/:userId/shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  async getAllByUser(
    @Param('userId', new ParseUUIDPipe(), UserExistPipe) userId: string,
    @Query()
    query?: GetShipmentDto,
  ) {
    const { type } = query;
    return await this.shipmentService.getAllByUser(userId, type);
  }

  @Post()
  async create(
    @Param('userId', new ParseUUIDPipe(), UserExistPipe) userId: string,
    @Body() createShipmentDto: CreateShipmentDto,
  ) {
    return await this.shipmentService.create(userId, createShipmentDto);
  }

  @Patch(':shipmentId')
  @UseGuards(ShipmentOwnershipGuard)
  async update(
    @Param('userId', new ParseUUIDPipe(), UserExistPipe) userId: string,
    @Param('shipmentId', new ParseUUIDPipe()) shipmentId: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    return await this.shipmentService.update(
      userId,
      shipmentId,
      updateShipmentDto,
    );
  }

  @Delete(':shipmentId')
  @UseGuards(ShipmentOwnershipGuard)
  async delete(
    @Param('userId', new ParseUUIDPipe(), UserExistPipe) userId: string,
    @Param('shipmentId', new ParseUUIDPipe())
    shipmentId: string,
  ) {
    return await this.shipmentService.softDelete(shipmentId);
  }
}
