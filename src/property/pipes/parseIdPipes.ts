import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
/**
 * ParseIdPipe is a custom pipe that transforms and validates route parameters expected to be numeric IDs.
 * It converts string IDs to numbers and ensures they are valid positive integers.
 * If the validation fails, it throws a BadRequestException with an appropriate message.
 */
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) throw new BadRequestException('id must be a number');
    if (val <= 0) throw new BadRequestException('id must be positive');
    return val;
  }
}
