import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 1. Import these
import { JwtStrategy } from './strategies/jwt.strategy'; // Don't forget your strategy!

/**
 * Authentication Module
 * - Handles user authentication and authorization
 * - Uses JWT for stateless authentication
 * - Integrates with UserModule for user data management
 * - Provides AuthService for authentication logic
 * - Exposes AuthController for handling auth-related HTTP requests
 * - What happens here is crucial for securing the application and managing user sessions.
 * - The process includes:
 *    1. Importing necessary modules and services
 *    2. Configuring JwtModule asynchronously to use ConfigService for environment variables
 *    3. Setting up JwtStrategy for validating JWT tokens
 */
@Module({
  imports: [
    // Ideally, you should import UserModule here instead of TypeOrm/UserService
    // but for now, we will stick to your current structure to avoid confusion.
    TypeOrmModule.forFeature([User]),

    // 2. Change to registerAsync
    JwtModule.registerAsync({
      imports: [ConfigModule], // Make ConfigModule available to this factory
      inject: [ConfigService], // Inject the ConfigService tool
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => {
        return {
          // 3. Use getOrThrow to ensure the app fails if JWT_SECRET is missing
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: {
            // Get expiration from env, or default to '1d' if missing
            expiresIn: configService.get<string>('JWT_EXPIRE_IN') || '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  // 4. Add JwtStrategy to providers so the Guard works
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UserService } from 'src/user/user.service';
// import { LocalStrategy } from './strategies/local.strategy';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/entities/user.entity';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
//     // Should be imported from .env
//     secret: '' //process.env.JWT_SECRET,
//     // global: boolean,
//     signOptions: { expiresIn: '1d' },
//   }),],
//   controllers: [AuthController],
//   providers: [AuthService, UserService, LocalStrategy],
// })
// export class AuthModule {}
