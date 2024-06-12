import { Controller, Get, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LeadDto } from './lead.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAll(@Query() query: { name: string }) {
    const leads = this.ordersService.getAll(query.name);
    return plainToInstance(LeadDto, leads);
  }
}
