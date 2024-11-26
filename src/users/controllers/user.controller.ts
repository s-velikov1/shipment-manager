import {
  Body,
  Controller,
  Delete,
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
