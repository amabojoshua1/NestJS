import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}
  async findAll() {}
  async findOne() {}
  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }
  async update() {}
  async delete() {}
}
