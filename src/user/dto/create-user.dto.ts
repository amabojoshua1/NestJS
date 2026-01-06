import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a new user.
 * Includes validation rules for each property.
 */
export class CreateUserDto {
  // DTO for creating a new user
  /**
   * A DTO is a design pattern used to transfer data between software application subsystems.
   * In this case, CreateUserDto is used to define the shape of the data required to create a new user.
   * In essence it is a DTO (Data Transfer Object) class used for creating a new user.
   * It includes the following properties with validation decorators:
   * - firstName: string (required)
   * - lastName: string (required)
   * - email: string (required, must be a valid email format)
   * - password: string (required)
   * - avatarUrl: string (optional)
   *
   * The class uses decorators from the 'class-validator' library to enforce validation rules.
   */
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  // plain text password should be hashed before storing!!!
  // never return plain text passwords in responses
  // trigger hashing has been performed in entity file
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
