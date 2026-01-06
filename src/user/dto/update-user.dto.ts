import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * Data Transfer Object for updating an existing user.
 * Extends the CreateUserDto to make all properties optional for partial updates.
 * This class uses the PartialType utility from '@nestjs/mapped-types' to inherit
 * the properties of CreateUserDto, making them optional.
 * This is useful for update operations where not all fields need to be provided.
 * @example
 * // Example usage in a controller method
 * @Patch(':id')
 * updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
 *   return this.userService.update(+id, updateUserDto);
 * }
 * @see {@link CreateUserDto} for the base DTO structure.
 * @see {@link https://docs.nestjs.com/techniques/serialization#partial-types} for more details on PartialType.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
