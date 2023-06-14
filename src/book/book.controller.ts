import { Controller, Get, Query, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './book.service';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Post()
  create() {
    return this.booksService.create();
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
  @Get('')
  get(@Query() query: { limit: number; page: number }) {
    return this.booksService.pagination(query.page, query.limit);
  }
}
