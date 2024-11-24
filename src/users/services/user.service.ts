import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async softDelete(id: string) {
    await this.userRepository.softDelete(id);

    return {
      success: true,
      message: `User with ID ${id} has been successfully deleted.`,
    };
  }
}
