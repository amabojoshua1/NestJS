/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseBoolPipe,
  //   ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOwnerDto } from './dto/createOwner.dto';
import { IdParamDto } from './dto/idParam.dt';
import { RequestHeader } from 'src/property/pipes/request-headers';
import th from 'zod/v4/locales/th.js';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}
  // This lists all owners
  @Get('all')
  findAll() {
    return this.ownerService.findAll();
  }

  // This module gets an owner by id
  @Get(':id')
  findOne(
    @Param() { id }: IdParamDto,
    @Query('exist', ParseBoolPipe) exist: boolean,
  ) {
    return this.ownerService.findOne();
  }

  // This module creates a new owner
  @Post('new')
  create(@Body() body: CreateOwnerDto) {
    return this.ownerService.create();
  }

  // This module updates an existing owner
  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      groups: ['update'],
      always: true,
    }),
  )
  //   update(
  //     @Param() { id }: IdParamDto,
  //     @Body() body: CreateOwnerDto,
  //     @Headers() headers: Record<string, string | string[] | undefined>,
  //   ): Record<string, unknown> {
  //     const safeHeaders: Record<string, string | string[] | undefined> =
  //       Object.fromEntries(Object.entries(headers || {}));
  //     return { ...safeHeaders, id, ...body };
  //   }
  //   }
  update(
    @Param() { id }: IdParamDto,
    @Body() body: CreateOwnerDto,
    @RequestHeader(
      new ValidationPipe({
        validateCustomDecorators: true,
      }),
    )
    header,
  ) {
    return this.ownerService.update();
  }
}
