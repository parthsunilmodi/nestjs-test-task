import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksDocument, Order, OrderDocument } from './order.schema';
import { Books, CreateOrderDto } from './dto/create-order.dto';
import { Book, BookDocument } from '../book/book.schema';
import { BooksService } from '../book/book.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<NonNullable<unknown>> {
    const booksId = createOrderDto.books.reduce(
      (previousValue: any, currentValue: Books) => {
        previousValue = [...previousValue, currentValue.bookId];
        return previousValue;
      },
      [],
    );

    const booksCount = await this.booksService.getBookCountUsingBooksId(
      booksId,
    );

    if (booksCount !== booksId.length) {
      throw new NotFoundException('please select valid books!');
    }
    const books = await this.booksService.getBookUsingBookId(booksId);
    const BookWithPoint = books.reduce(
      (previousValue: any, currentValue: any) => {
        return { ...previousValue, [currentValue._id]: currentValue.points };
      },
      {},
    );

    const totalPoint = createOrderDto.books.reduce(
      (previousValue: any, currentValue: Books) => {
        return (
          previousValue +
          currentValue.quantity * BookWithPoint[currentValue.bookId]
        );
      },
      0,
    );

    const getUserPoint = await this.usersService.getUserPoint(userId);
    if (getUserPoint < totalPoint) {
      throw new NotFoundException("you don't have sufficient balance !");
    }

    const requestBook = createOrderDto.books.map((book) => {
      return { ...book, points: BookWithPoint[book.bookId] };
    });

    const order = new this.orderModel({
      userId,
      books: requestBook,
      total: totalPoint,
    });
    const response = await order.save();
    await this.usersService.updateWithField(
      userId,
      'points',
      getUserPoint - totalPoint,
    );

    return response;
  }

  async findAll(userId, page, limit): Promise<OrderDocument[]> {
    return this.orderModel
      .find({ userId: { $in: userId } })
      .limit(limit)
      .skip((page - 1) * limit);
  }

  async cancelOrder(userId: string, orderId: string): Promise<OrderDocument> {
    const order = await this.orderModel.findOne({
      _id: orderId,
      isCancel: false,
      userId,
    });
    if (!order) {
      throw new NotFoundException('order not found!');
    }
    const userPoint = await this.usersService.getUserPoint(userId);
    await this.usersService.updateWithField(
      userId,
      'points',
      userPoint + order.total,
    );
    order.isCancel = true;
    order.save();
    return order;
  }
}
