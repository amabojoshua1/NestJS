import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

export const pgConfig: PostgresConnectionOptions = {
  // postgresql://user:password@host:port/database_name
  url: 'postgresql://postgres:Venus2003.T@localhost:5432/postgres',
  type: 'postgres',
  port: 5432,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // set to false in production
};
