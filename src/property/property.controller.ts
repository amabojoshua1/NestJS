/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  // HttpCode,
  // ParseIntPipe,
  ParseBoolPipe,
  Query,
  ValidationPipe,
  UsePipes,
  Patch,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dt';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}
  // This module is used to get all properties
  @Get('all')
  findAll() {
    return this.propertyService.findAll();
  }

  // This module is used to get a property by its id
  @Get(':id')
  findOne(
    @Param() { id }: IdParamDto,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ) {
    console.log(typeof sort);
    return this.propertyService.findOne();
  }

  // This module is used to create a new property
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // @HttpCode(202)
  create(@Body() body: CreatePropertyDto) {
    return this.propertyService.create();
  }

  // This module is used to update given property details
  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      groups: ['update'],
      always: true,
    }),
  )
  update(@Param() { id }: IdParamDto, @Body() body: CreatePropertyDto) {
    return this.propertyService.update();
  }
}
