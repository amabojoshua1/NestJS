/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ValidationPipe,
  UsePipes,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dt';
import { PropertyService } from './property.service';
import { ParseIdPipe } from './pipes/parseIdPipes';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}
  // This controller is used to get all properties
  @Get('all')
  findAll() {
    return this.propertyService.findAll();
  }

  // This controller is used to get a property by its id
  @Get(':id')
  findOne(
    @Param() { id }: IdParamDto,
    // @Query('sort', ParseBoolPipe) sort: boolean,
  ) {
    // console.log(typeof sort);
    return this.propertyService.findOne(id);
  }

  // This controller is used to create a new property
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // @HttpCode(202)
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  // This controller is used to update given property details
  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      groups: ['update'],
      always: true,
    }),
  )

  // Below is the first method to use for id, Below that is the second - creating and id cleaner pipe
  // update(@Param() { id }: IdParamDto, @Body() body: UpdatePropertyDto) {
  update(@Param('id', ParseIdPipe) id, @Body() body: UpdatePropertyDto) {
    // eslintdisable-next-line @typescript-eslint/no-unsafe-argument
    return this.propertyService.update(id, body);
  }

  // This controller deletes a created property
  @Delete(':id')
  delete(@Param('id', ParseIdPipe) id) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.propertyService.delete(id);
  }
}
