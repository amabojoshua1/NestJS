import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Fix 3: Define an interface for your payload so you don't use 'any'
// interface JwtPayload {
//   sub: number;
//   username: string;
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Fix 1: Use getOrThrow (NestJS v8+) or the non-null assertion (!)
      // This tells TypeScript: "I guarantee this value exists, don't worry about undefined."
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // Fix 2: Remove 'async' because you aren't waiting for a database call here.
  // Fix 3: Use the specific type instead of 'any'.
  //   validate(payload: JwtPayload) {
  validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       // key: process.env.JWT_SECRET,
//       secretOrKey: configService.get('JWT_SECRET'),
//     });
//   }

//   async validate(payload: any) {
//     return { userId: payload.sub, username: payload.username };
//   }
// }
