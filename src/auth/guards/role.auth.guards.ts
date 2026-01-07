/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * RoleGuard checks if the user has the required roles to access a route.
 * It retrieves the required roles from the route's metadata and compares them
 * with the roles present in the authenticated user's information.
 * If the user has at least one of the required roles, access is granted.
 * Otherwise, access is denied.
 * This is basically what each line of code does:
 * 1. The `RoleGuard` class implements the `CanActivate` interface, which requires
 *    the implementation of the `canActivate` method.
 * 2. The constructor injects the `Reflector` service, which is used to read metadata
 *    set on route handlers.
 * 3. In the `canActivate` method, it retrieves the required roles for the route using
 *    `this.reflector.get<string[]>('roles', context.getHandler())`.
 * 4. If no roles are required (i.e., `requiredRoles` is undefined), it returns `true`,
 *    allowing access.
 * 5. It then extracts the request object from the execution context and retrieves the
 *    authenticated user from `request.user`.
 * 6. Finally, it checks if the user has at least one of the required roles using
 *    `some()` method and returns `true` or `false` accordingly.
 *
 * This is what each of the imports doess and is used for:
 * - `CanActivate`: An interface that defines a contract for guards in NestJS.
 * - `ExecutionContext`: Provides methods to access details about the current request.
 * - `Injectable`: A decorator that marks the class as a provider that can be injected.
 * - `Reflector`: A service that allows reading metadata set on classes and methods.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  // Constructor injects the Reflector service, which is used to read metadata
  constructor(private reflector: Reflector) {}

  // The canActivate method determines whether the current request is allowed
  // It gets details about the current request from the ExecutionContext
  // boolean indicates whether access is granted (true) or denied (false)
  canActivate(context: ExecutionContext): boolean {
    // Retrieve the required roles for the route from metadata
    // 'roles' is the metadata key used to store required roles
    // context.getHandler() gets the method (route handler) being accessed
    // This route handler may have roles defined using a custom decorator
    // If no roles are required, allow access by returning true
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    // Extract the request object from the execution context
    // This gives access to the HTTP request details
    // Retrieve the authenticated user from the request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has at least one of the required roles
    // the ? operator ensures that if user.roles is undefined, it won't throw an error
    // includes operation checks if a specific role exists in user.roles
    // user.roles is assumed to be an array of roles assigned to the user
    // some() method checks if any role in requiredRoles exists in user.roles
    // Return true if a matching role is found, otherwise false
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
