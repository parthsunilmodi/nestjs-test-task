import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    // return this.ordersService.create(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
