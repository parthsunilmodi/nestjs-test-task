import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { Books, CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<void> {
    const booksId = createOrderDto.books.reduce(
      (previousValue: any, currentValue: Books) => {
        previousValue.push(currentValue.bookId);
      },
      [],
    );
    console.log(booksId); // const createdUser = new this.OrderModel(createOrderDto);
    // return createdUser.save();
  }

  async findAll(): Promise<OrderDocument[]> {
    return this.OrderModel.find().exec();
  }
}
