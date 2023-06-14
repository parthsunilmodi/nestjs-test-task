import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { isNumber } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(): Promise<any> {
    Array.from(Array(100)).map(async (_, i) => {
      const title = (Math.random() + 1).toString(36).substring(7);
      const writer = (Math.random() + 1).toString(36).substring(7);
      const createdUser = new this.bookModel({
        title,
        writer,
      });
      await createdUser.save();
    });
  }

  async pagination(page, limit, search): Promise<BookDocument[]> {
    const searchRegExp = new RegExp(search, 'i');
    const filter = [
      {
        writer: { $regex: searchRegExp },
      },
      {
        title: { $regex: searchRegExp },
      },
      {
        tag: { $regex: searchRegExp },
      },
    ];

    return this.bookModel
      .find({
        $or: filter,
      })
      .limit(limit)
      .skip((page - 1) * limit);
  }

  async getBookCountUsingBooksId(booksId: string[]): Promise<number> {
    return this.bookModel.find({ _id: { $in: booksId } }).count();
  }

  async getBookUsingBookId(booksId: string[]): Promise<BookDocument[]> {
    return this.bookModel.find({ _id: { $in: booksId } });
  }
}
