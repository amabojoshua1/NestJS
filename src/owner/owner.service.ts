import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownerRepo: Repository<Owner>) {}
  async findAll() {}
  async findOne() {}
  async create() {}
  async update() {}
  async delete() {}
}
