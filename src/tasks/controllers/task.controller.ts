import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('users/:userId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllByUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return await this.taskService.getAllByUser(userId);
  }

  @Post()
  async create(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.create({ ...createTaskDto, userId });
  }

  @Patch(':taskId')
  async update(
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.update(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async delete(@Param('taskId', new ParseUUIDPipe()) taskId: string) {
    return await this.taskService.softDelete(taskId);
  }
}
