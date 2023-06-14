import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from '../book/book.schema';
import { User } from '../users/user.schema';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.Array, required: true })
  books: Book;

  @Prop({ default: 0 })
  total: number;

  @Prop({ default: false })
  isCancel: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
