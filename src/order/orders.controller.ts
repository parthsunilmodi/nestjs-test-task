import { Controller, Get, Post, Body, UseGuards, Req, Param, Query } from "@nestjs/common";
import { CreateOrderDto } from './dto/create-order.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { OrdersService } from './orders.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OrderDocument } from './order.schema';
import { Request } from 'express';
import { ApiImplicitQuery } from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";

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
  @Get(':id')
  cancelOrder(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<OrderDocument> {
    return this.ordersService.cancelOrder(req.user['sub'], id);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @ApiImplicitQuery({
    name: 'limit',
    required: true,
    type: Number,
  })
  @ApiImplicitQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @Get()
  findAll(@Query() query: { limit: number; page: number }) {
    return this.ordersService.findAll(query.page || 1, query.limit || 10);
  }
}
