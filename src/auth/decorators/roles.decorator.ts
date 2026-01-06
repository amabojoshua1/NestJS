import { SetMetadata } from '@nestjs/common';

/**
 * @module common/decorators/roles
 * @description Provides a custom decorator to assign roles metadata to controller routes or handlers.
 */

/**
 * @function Roles
 * @param {...string[]} roles - A variadic parameter representing the list of roles
 *                              that are allowed to access the decorated route or handler.
 * @returns {CustomDecorator} A NestJS custom decorator function that applies metadata.
 *
 * @description
 * This decorator is used to attach role-based authorization metadata to
 * route handlers (methods) or entire controllers (classes).
 *
 * When applied, it sets metadata with a key of 'roles' and the provided array of role strings
 * as its value. This metadata can then be read by guards (e.g., a `RolesGuard`)
 * to determine if a user has the necessary permissions to access the resource.
 *
 * @example
 * // Apply to a method (route handler)
 * @Controller('admin')
 * export class AdminController {
 *   @Get('dashboard')
 *   @Roles('admin', 'super-admin') // Only users with 'admin' or 'super-admin' role can access
 *   getDashboard() {
 *     return 'Admin Dashboard';
 *   }
 * }
 *
 * @example
 * // Apply to a class (all methods within the controller will require these roles by default)
 * @Roles('editor')
 * @Controller('content')
 * export class ContentController {
 *   @Get('articles')
 *   getArticles() {
 *     return 'List of articles (editor access)';
 *   }
 *
 *   @Post('new')
 *   @Roles('admin') // Can override class-level roles for specific methods
 *   createArticle() {
 *     return 'Create new article (admin access)';
 *   }
 * }
 *
 * @see {@link https://docs.nestjs.com/guards#role-based-authentication} for more details on using guards with this metadata.
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
