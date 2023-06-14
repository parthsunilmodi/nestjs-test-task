import { ApiProperty } from '@nestjs/swagger';

export interface Books {
  bookId: string;
  quantity: number;
  points: number;
}

export class BookDto {
  @ApiProperty({
    description: 'Enter your BookId',
  })
  public bookId: string;
  @ApiProperty({
    description: 'Enter your quantity',
  })
  public quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Enter your BookId',
    type: [BookDto],
    isArray: true,
  })
  books: Books[];
}
