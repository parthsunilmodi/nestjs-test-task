import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDocument } from './user.schema';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get()
  user(@Req() req: Request): Promise<UserDocument> {
    return this.usersService.findById(req.user['sub']);
  }
}
