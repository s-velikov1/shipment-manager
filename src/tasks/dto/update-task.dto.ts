import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { TaskStatus } from 'src/common/enums/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
