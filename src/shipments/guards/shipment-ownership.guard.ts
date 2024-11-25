import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShipmentService } from '../services/shipment.service';

@Injectable()
export class ShipmentOwnershipGuard implements CanActivate {
  constructor(@Inject() private readonly shipmentService: ShipmentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId, shipmentId } = request.params;

    const shipment = await this.shipmentService.getOneByIdAndUser(
      userId,
      shipmentId,
    );

    if (!shipment) {
      throw new NotFoundException(
        `Shipment with ID ${shipmentId} not found or not owned by the user`,
      );
    }
    return true;
  }
}
