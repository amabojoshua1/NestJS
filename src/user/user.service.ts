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
   * What happens here is the injection of the User repository.
   * This allows the service to interact with the User entity in the database.
   * The process includes:
   * 1. Using the @InjectRepository decorator to inject the User repository.
   * 2. Storing the injected repository in a private member called UserRepo of type Repository<User> for use in other methods.
   * This setup is essential for performing database operations related to users within the service.
   */
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  /**
   *
   * @param createUserDto - corresponds to the CreateUserDto
   * @returns The created user entity
   * This method creates a new user in the database using the provided data transfer object (DTO).
   * It utilizes the User repository to create and save the new user entity.
   * The process includes:
   * 1. Creating a new user entity from the DTO.
   * 2. Saving the new user entity to the database.
   * 3. Returning the saved user entity.
   * In a real application, consider adding error handling and validation here.
   * For example, you might want to check if a user with the same email already exists before creating a new one.
   * You might also want to hash the user's password before saving it to the database for security reasons.
   * These enhancements help ensure data integrity and security in user management.
   */
  async create(createUserDto: CreateUserDto) {
    const newUser = this.UserRepo.create(createUserDto);
    return await this.UserRepo.save(newUser);
  }

  // Used in AuthService to validate user by email
  /**
   * @param email This is the email of the user to be verified
   * @returns The user data corresponding to that email.
   * This async method defines the logic for how users can be found base on their email addresses.
   * It does this by:
   * 1. Using the User repository to search for a user entity where the email matches the provided email.
   * 2. Returning the found user entity or null if no user is found.
   * This method is essential for authentication processes where user identification by email is required such as when using jwt strategy.
   */
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
