import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
/**
 * User service
 * Handles business logic related to user operations such as creation, retrieval, updating, and deletion.
 */
export class UserService {
  /**
   *
   * @param UserRepo
   */
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  /**
   *
   * @param createUserDto - corresponds to the CreateUserDto
   * @returns The created user entity
   * This method creates a new user in the database using the provided data transfer object (DTO).
   * It utilizes the User repository to create and save the new user entity.
   */
  async create(createUserDto: CreateUserDto) {
    const newUser = this.UserRepo.create(createUserDto);
    return await this.UserRepo.save(newUser);
  }

  /**
   *
   * @param email corresponds to email to be searched
   * @returns results of the search
   * This method searches and finds email for a given user.
   * It returns it if it exist
   */
  // Find user by email
  async findByEmail(email: string) {
    return await this.UserRepo.findOne({ where: { email } });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
