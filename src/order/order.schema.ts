import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from '../book/book.schema';
import { User } from '../users/user.schema';

export type OrderDocument = Order & Document;
export type BookDocument = Book & Document;

@Schema({ versionKey: false })
export class Books {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'books', required: true })
  bookId: Book;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  writer: string;

  @Prop({
    default:
      'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
  })
  coverImage: string;

  @Prop({ default: 5 })
  points: number;

  @Prop({
    default: 'fiction',
    enum: ['fiction', 'non-fiction', 'science', 'essay'],
  })
  tag: string;
}

@Schema({ versionKey: false })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.Array, required: true })
  books: Books;

  @Prop({ default: 0 })
  total: number;

  @Prop({ default: false })
  isCancel: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
