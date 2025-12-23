import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  //   Validate user credentials
  // the goal is to return user data if valid, or throw an error if not
  async validateUser(email: string, password: string): Promise<any> {
    // Find user by emails
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    // Compare passwords to check validity
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    // return { id: user.id, email: user.email };
    return { id: user.id };
  }
}
