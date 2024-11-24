import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserType } from 'src/common/enums/user-type.enum';

export class CreateUserDto {
  @IsString()
  @Length(1, 50) // Ensure non-empty and limit to a maximum of 50 characters
  first_name: string;

  @IsString()
  @Length(1, 50)
  last_name: string;

  @IsOptional()
  @IsEnum(UserType)
  type: UserType;
}
