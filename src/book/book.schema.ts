import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ versionKey: false })
export class Book {
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

export const BookSchema = SchemaFactory.createForClass(Book);
