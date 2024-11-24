import { Module } from '@nestjs/common';
import { ShipmentController } from './controllers/shipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { ShipmentService } from './services/shipment.service';
import { UserModuleModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment]), UserModuleModule],
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentModule {}
