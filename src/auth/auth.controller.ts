import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // This endpoint uses the local strategy to authenticate users
  // This decorator applies the AuthGuard with the 'local' strategy
  // AuthGuard will handle the authentication process by invoking the LocalStrategy
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login() {}
}
