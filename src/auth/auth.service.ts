/* eslint-disable @typescript-eslint/require-await */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

/**
 * AuthService handles user authentication logic.
 * It provides methods to validate user credentials.
 * The validateUser method checks if the provided email and password
 * correspond to a valid user in the system.
 * If the user is found and the password matches, it returns the user data. actaually it returns only the user id.
 * If the user is not found or the password does not match, it throws an UnauthorizedException.
 * This service relies on the UserService to fetch user data from the database.
 * It uses bcrypt to compare hashed passwords securely.
 * IT does this by:
 * 1. Injecting the UserService to access user data.
 * 2. Implementing the validateUser method that:
 *    - Fetches the user by email.
 *    - Compares the provided password with the stored hashed password.
 *    - Returns user data if valid or throws an exception if invalid.
 * stores results in a variable called isPasswordValid
 * store user data in a variable called user and uses it to get user id
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

    // return { id: user.id, email: user.email }
    /**
     * You can still decide to remove password from the data returned then return it as the new user.
     * This is done like so:
     * const { password, ...result } = user;
     * return result;
     // eslint-disable-next-line prettier/prettier
     * 
     * However, for security most generate the jwt and return it here instead.
     * Where jwtService is injected in the constructor like so:
     * constructor(private userService: UserService, private jwtService: JwtService) {}
     * In a real application, consider returning a JWT token here.
     * The process includes:
     * 1. Creating a payload with user information.
     * 2. Signing the payload to generate a JWT.
     * 3. Returning the JWT to the client for use in subsequent requests.
     * For instance this can be done like so:
     *    const payload = { username: user.username, sub: user.id };
     *    return {
     *      access_token: await this.jwtService.signAsync(payload),
     *    };
     * This way, the client receives a token to use for authenticated requests instead of user data.
     * This is more secure and aligns with best practices for stateless authentication.
     * The current implementation only returns the user id for simplicity.
     * This approach enhances security and user session management.
     * Make sure to import JwtService from '@nestjs/jwt' when implementing JWT generation.
     */
    return { id: user.id, email: user.email };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
