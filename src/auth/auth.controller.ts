/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // This endpoint uses the local strategy to authenticate users
  // This decorator applies the AuthGuard with the 'local' strategy
  // AuthGuard will handle the authentication process by invoking the LocalStrategy

  /*
  useGuards is a decorator that applies the specified guard(s) to the route handler
  Guards are used to implement authentication and authorization logic
  In this case, AuthGuard('local') uses the 'local' strategy defined in LocalStrategy
  When a request is made to this endpoint, the guard will invoke the validate method of LocalStrategy
  If validation is successful, the request proceeds to the route handler; otherwise, an error is thrown
  */
  // @UseGuards(AuthGuard('local'))
  /**
   * What happens here is that when a POST request is made to /auth/login
   * The LocalAuthGuard is invoked, which uses the LocalStrategy to validate the user's credentials
   * If the credentials are valid, the authenticated user object is attached to req.user
   * The login method then returns this user object as the response
   * @param req user
   * @returns req.user
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    // The authenticated user is attached to req.user by the AuthGuard
    // These lines performs the following:
    // 1. Calls the login method of AuthService with req.user
    // 2. Awaits the result, which is expected to be a token object
    // 3. Sets the Authorization header in the response with the Bearer token
    // 4. Returns a success message indicating that login was successful
    const tokenObject = await this.authService.login(req.user);
    response.set('Authorization', `Bearer ${tokenObject.access_token}`);
    return { message: 'Login successful' }; // Return the authenticated user data
  }
}
