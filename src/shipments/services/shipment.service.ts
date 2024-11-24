import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Shipment } from '../entities/shipment.entity';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ShipmentType } from 'src/common/enums/shipment-type.enum';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getAllByUser(userId: string, type?: ShipmentType) {
    const queryBuilder = this.entityManager
      .createQueryBuilder(Shipment, 'shipment')
      .where('shipment.created_by_id = :userId', { userId });

    if (type) {
      queryBuilder.andWhere('shipment.type = :type', { type });
    }

    return await queryBuilder.getMany();
  }

  async getOneByIdAndUser(
    userId: string,
    shipmentId: string,
  ): Promise<Shipment> {
    const shipment = this.entityManager
      .createQueryBuilder(Shipment, 'shipment')
      .where('shipment.id = :shipmentId', { shipmentId })
      .andWhere('shipment.created_by_id = :userId', { userId })
      .getOne();

    if (!shipment) {
      throw new NotFoundException(
        `Shipment with ID ${shipmentId} not found or not owned by the user`,
      );
    }

    return shipment;
  }

  async create(userId: string, createShipmentDto: CreateShipmentDto) {
    const shipment = this.entityManager.create(Shipment, {
      ...createShipmentDto,
      created_by: { id: userId },
    });

    return await this.entityManager.save(shipment);
  }

  async update(
    userId: string,
    shipmentId: string,
    updateShipmentDto: UpdateShipmentDto,
  ) {
    const shipment = await this.getOneByIdAndUser(userId, shipmentId);

    Object.assign(shipment, updateShipmentDto);

    return await this.entityManager.save(shipment);
  }

  async softDelete(shipmentId: string) {
    const result = await this.entityManager.softDelete(Shipment, shipmentId);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Shipment with ID ${shipmentId} could not be deleted (not found).`,
      );
    }

    return {
      success: true,
      message: `Shipment with ID ${shipmentId} has been successfully deleted.`,
    };
  }
}
