import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';

@Injectable()
export class UserExistPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: any) {
    const user = await this.userService.getOneById(value);
    if (!user) {
      throw new NotFoundException(`User with ID ${value} does not exist`);
    }

    return value;
  }
}
