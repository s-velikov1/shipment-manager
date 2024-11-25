import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { userId, shipmentId, ...taskDetails } = createTaskDto;

    const task = this.entityManager.create(Task, {
      ...taskDetails,
      user: { id: userId },
      shipment: { id: shipmentId },
    });

    return await this.entityManager.save(Task, task);
  }

  async getAllByUser(userId: string): Promise<Task[]> {
    return await this.entityManager
      .createQueryBuilder(Task, 'task')
      .innerJoinAndSelect('task.user', 'user')
      .innerJoinAndSelect('task.shipment', 'shipment')
      .where('task.user_id = :userId', { userId })
      .getMany();
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.entityManager.findOne(Task, {
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    Object.assign(task, updateTaskDto);
    return await this.entityManager.save(Task, task);
  }

  async softDelete(
    taskId: string,
  ): Promise<{ success: boolean; message: string }> {
    const result = await this.entityManager.softDelete(Task, { id: taskId });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found.`);
    }

    return {
      success: true,
      message: `Task with ID ${taskId} has been deleted.`,
    };
  }
}
