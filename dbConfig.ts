import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import { ConfigService } from '@nestjs/config';

/**
 * PostgreSQL database configuration
 * Defines the connection settings for the PostgreSQL database used by the application.
 */
export const pgConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  url: configService.get<string>('DB_URL'),
  port: configService.get<number>('DB_PORT'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // set to false in production
});
