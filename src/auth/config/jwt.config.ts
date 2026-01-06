import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', (): JwtModuleOptions => {
  // If you want "getOrThrow" behavior here, you must write a simple check:
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is missing!');
  }

  return {
    secret: process.env.JWT_SECRET,
    signOptions: {
      // process.env returns a string.
      // NestJS JWT handles strings like '60s' or '1h' perfectly. In this case '1d' will be used as default.
      expiresIn: process.env.JWT_EXPIRE_IN || '1d',
    },
  };
});
