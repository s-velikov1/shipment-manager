import { IsEnum, IsNotEmpty, IsUUID, Length } from 'class-validator';
import { TaskStatus } from 'src/common/enums/task-status.enum';

export class CreateTaskDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  shipmentId: string;

  @IsNotEmpty()
  @Length(1, 255)
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
