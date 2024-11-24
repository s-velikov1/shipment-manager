import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  // async getAll(): Promise<User[]> {
  //   return await this.entityManager.createQueryBuilder(User, 'user').getMany();
  // }

  async getOneById(userId: string) {
    const user = await this.entityManager
      .createQueryBuilder(User, 'user')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = this.entityManager.create(User, user);
    return await this.entityManager.save(newUser);
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getOneById(userId);

    Object.assign(user, updateUserDto);

    return await this.entityManager.save(user);
  }

  async softDelete(id: string) {
    const result = await this.entityManager.softDelete(User, id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} could not be deleted.`);
    }

    return {
      success: true,
      message: `User with ID ${id} has been successfully deleted.`,
    };
  }
}
