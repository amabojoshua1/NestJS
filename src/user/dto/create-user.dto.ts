import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating a new user.
 * Includes validation rules for each property.
 */
export class CreateUserDto {
  // DTO for creating a new user
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
