import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ShipmentItem } from '../entities/shipment-item.entity';
import { CreateShipmentItemDto } from '../dto/create-shipment-item.dto';
import { UpdateShipmentItemDto } from '../dto/update-shipment-item.dto';

@Injectable()
export class ShipmentItemService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getAllByShipment(shipmentId: string): Promise<ShipmentItem[]> {
    return await this.entityManager
      .createQueryBuilder(ShipmentItem, 'item')
      .where('item.shipment_id = :shipmentId', { shipmentId })
      .getMany();
  }

  async getOneByIdAndShipment(
    shipmentId: string,
    itemId: string,
  ): Promise<ShipmentItem> {
    const item = await this.entityManager
      .createQueryBuilder(ShipmentItem, 'item')
      .where('item.id = :itemId', { itemId })
      .andWhere('item.shipment_id = :shipmentId', { shipmentId })
      .getOne();

    if (!item) {
      throw new NotFoundException(
        `Shipment item with ID ${itemId} not found for shipment ${shipmentId}.`,
      );
    }

    return item;
  }

  async create(
    shipmentId: string,
    createShipmentItemDto: CreateShipmentItemDto,
  ): Promise<ShipmentItem> {
    const item = this.entityManager.create(ShipmentItem, {
      ...createShipmentItemDto,
      shipment: { id: shipmentId },
    });

    return await this.entityManager.save(ShipmentItem, item);
  }

  async update(
    shipmentId: string,
    itemId: string,
    updateShipmentItemDto: UpdateShipmentItemDto,
  ): Promise<ShipmentItem> {
    const item = await this.getOneByIdAndShipment(shipmentId, itemId);

    Object.assign(item, updateShipmentItemDto);

    return await this.entityManager.save(ShipmentItem, item);
  }

  async softDelete(shipmentId: string, itemId: string) {
    const result = await this.entityManager.softDelete(ShipmentItem, {
      id: itemId,
      shipment: { id: shipmentId },
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Shipment item with ID ${itemId} not found for shipment ${shipmentId}.`,
      );
    }

    return {
      success: true,
      message: `Shipment item with ID ${itemId} has been successfully deleted.`,
    };
  }
}
