import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book, BookDocument } from "./book.schema";

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
  }

  async create(): Promise<any> {
    Array.from(Array(100)).map(async (_, i) => {
      const title = (Math.random() + 1).toString(36).substring(7);
      const writer = (Math.random() + 1).toString(36).substring(7);
      const createdUser = new this.bookModel({
        title,
        writer
      });
      await createdUser.save();
    });
  }

  async pagination(page, limit): Promise<BookDocument[]> {
    console.log(page, limit);
    return this.bookModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit);
  }
}
