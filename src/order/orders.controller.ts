import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { OrdersService } from './orders.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() request, @Body() createOrderDto: CreateOrderDto) {
    const userId: string = request.user.sub;
    return this.ordersService.create(userId, createOrderDto);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
