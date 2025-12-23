import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * Data Transfer Object for updating an existing user.
 * Extends the CreateUserDto to make all properties optional for partial updates.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
