import { Module } from '@nestjs/common';
import { ShipmentController } from './controllers/shipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { ShipmentService } from './services/shipment.service';
import { UserModuleModule } from 'src/users/user.module';
import { ShipmentItemController } from './controllers/shipment-item.controller';
import { ShipmentItemService } from './services/shipment-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment]), UserModuleModule],
  controllers: [ShipmentController, ShipmentItemController],
  providers: [ShipmentService, ShipmentItemService],
})
export class ShipmentModule {}
