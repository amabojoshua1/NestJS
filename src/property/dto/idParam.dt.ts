// /* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsPositive } from 'class-validator';

export class IdParamDto {
  @IsPositive()
  @IsInt()
  id: number;
}
