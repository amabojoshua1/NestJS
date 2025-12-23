import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

/* 
A class is injectable if it is meant to be a provider
Providers are classes that can be injected as dependencies; they can be services, repositories, factories, helpers, etc.
They are usually annotated with the @Injectable() decorator
They are registered within a module's providers array so that NestJS can manage their lifecycle and dependencies
*/
@Injectable()
/**
 * LocalStrategy is a class that extends PassportStrategy with the 'local' strategy
 * It is responsible for validating user credentials (email and password)
 * It uses the AuthService to perform the actual validation logic
 */
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  validate(email: string, password: string) {
    return this.authService.validateUser(email, password);
  }
}
