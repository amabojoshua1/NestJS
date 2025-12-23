import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// A guard is a class annotated with the @Injectable() decorator that implements the CanActivate interface
// Guards determine whether a request will be handled by the route handler or not
// They can be used for authentication, authorization, and other pre-processing tasks
/**
 * LocalAuthGuard is a guard that uses the 'local' strategy for authentication
 * It extends the AuthGuard class provided by @nestjs/passport
 * By extending AuthGuard with 'local', it leverages the LocalStrategy defined in local.strategy.ts
 * When applied to a route, it will invoke the LocalStrategy to validate user credentials
 */
export class LocalAuthGuard extends AuthGuard('local') {}
