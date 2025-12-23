import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

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
  async login(@Request() req) {
    // The authenticated user is attached to req.user by the AuthGuard
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return await req.user; // Return the authenticated user data
  }
}
