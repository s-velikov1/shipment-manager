import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from 'src/common/enums/user-type.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEnum(UserType)
  type: UserType;
}
