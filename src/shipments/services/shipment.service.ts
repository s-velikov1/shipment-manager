import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shipment } from '../entities/shipment.entity';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GetShipmentDto } from '../dto/get-shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
  ) {}

  async getAllByUser(userId: string, type?: GetShipmentDto) {
    const queryBuilder = this.shipmentRepository
      .createQueryBuilder('shipment')
      .where('shipment.created_by_id = :userId', { userId });

    console.log(type);
    if (type) {
      queryBuilder.andWhere('shipment.type = :type', { type });
    }

    return await queryBuilder.getMany();
  }

  async getOneByIdAndUser(
    userId: string,
    shipmentId: string,
  ): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id: shipmentId, created_by_id: { id: userId } },
    });

    if (!shipment) {
      throw new NotFoundException(
        `Shipment with ID ${shipmentId} not found or not owned by the user`,
      );
    }

    return shipment;
  }

  async create(userId: string, createShipmentDto: CreateShipmentDto) {
    const shipment = this.shipmentRepository.create({
      ...createShipmentDto,
      created_by_id: { id: userId },
    });

    return await this.shipmentRepository.save(shipment);
  }

  async update(
    userId: string,
    shipmentId: string,
    updateShipmentDto: UpdateShipmentDto,
  ) {
    const shipment = await this.getOneByIdAndUser(userId, shipmentId);

    Object.assign(shipment, updateShipmentDto);

    return await this.shipmentRepository.save(shipment);
  }

  async softDelete(shipmentId: string) {
    await this.shipmentRepository.softDelete(shipmentId);

    return {
      success: true,
      message: `Shipment with ID ${shipmentId} has been successfully deleted.`,
    };
  }
}
