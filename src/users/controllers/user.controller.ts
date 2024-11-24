import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserExistPipe } from 'src/common/pipes/user-exist.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Get()
  // async getAll() {
  //   return await this.userService.getAll();
  // }

  @Get(':userId')
  async getOne() {
    return {};
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }

  @Patch(':userId')
  async update(
    @Param('userId', new ParseUUIDPipe(), UserExistPipe) userId: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async delete(
    @Param('userId', new ParseUUIDPipe(), UserExistPipe) userId: string,
  ) {
    return this.userService.softDelete(userId);
  }
}
