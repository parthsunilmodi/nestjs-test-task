import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty({
    description: 'Enter your BookId',
    default: 1,
  })
  bookId: string;
  @ApiProperty({
    description: 'Enter your username',
    default: 1,
  })
  quantity: number;
}
