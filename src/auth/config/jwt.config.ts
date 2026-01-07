/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';

/**
 * JWT ConfigurationT
 * This is exact what happens here line by line:
 * 1. The `registerAs` function is imported from `@nestjs/config`. It is used to create a namespaced configuration.
 * 2. The `JwtModuleOptions` interface is imported from `@nestjs/jwt`. This interface defines the shape of the configuration object for the JWT module.
 * 3. The `registerAs` function is called with two arguments:
 *    - The first argument is the namespace string `'jwt'`, which identifies this configuration.
 *    - The second argument is a function that returns a `JwtModuleOptions` object.
 * 4. Inside the function, the JWT secret and sign options are defined:
 *    - The `secret` property is set to the value of the `JWT_SECRET` environment variable.
 *    - The `signOptions` property is an object that contains the `expiresIn` property, which is set to the value of the `JWT_EXPIRE_IN` environment variable or defaults to `'1d'` if not provided.
 * 5. The resulting configuration object is returned and can be used by the JWT module in the NestJS application.
 *
 * This setup allows for easy management and retrieval of JWT-related configuration settings in a structured manner.
 *
 */
export default registerAs('jwt', (): JwtModuleOptions => {
  // If you want "getOrThrow" behavior here, you must write a simple check:
  // because this function does not support dependency injection.
  // So we manually check for the presence of the env variable.
  // If it's missing, we throw an error to prevent misconfiguration.
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is missing!');
  }

  return {
    secret: process.env.JWT_SECRET,
    signOptions: {
      // process.env returns a string.
      // NestJS JWT handles strings like '60s' or '1h' perfectly. In this case '1d' will be used as default.
      expiresIn: (process.env.JWT_EXPIRE_IN || '1d') as any,
    },
  };
});
