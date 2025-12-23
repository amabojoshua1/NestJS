/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

/**
 * RequestHeader is a custom parameter decorator that extracts and validates HTTP request headers.
 * It transforms the headers into an instance of the specified DTO class and performs validation.
 * If validation fails, it throws an error.
 * @param targetDto - The DTO class to which the headers will be transformed.
 * @return The validated DTO instance containing the request headers.
 * @example
 * ```typescript
 * @Get()
 * myMethod(@RequestHeader(MyHeaderDto) headers: MyHeaderDto) {
 *   // Use the validated headers here
 * }
 * ```
 */
export const RequestHeader = createParamDecorator(
  async (targetDto: any, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const dto = plainToInstance(targetDto, headers, {
      excludeExtraneousValues: true,
    });
    await validateOrReject(dto);
    return dto;
  },
);
