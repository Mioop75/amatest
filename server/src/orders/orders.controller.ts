import { Controller, Get } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LeadDto } from './lead.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAll() {
    const leads = this.ordersService.getAll();
    return plainToInstance(LeadDto, leads);
  }
}
