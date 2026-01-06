import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { OwnerModule } from './owner/owner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    /**
     * Config Module
     * - isGlobal: true  --> makes the ConfigModule available globally without needing to import it in other modules
     * - envFilePath: [] --> specify multiple environment files to load variables from
     * - load: [configurations] --> load configuration objects or functions
     * - validationSchema: schema --> validate environment variables using a Joi schema. The process includes:
     *    1. Load variables from specified env files and process.env
     *    2. Validate them against the provided Joi schema
     *    3. Throw an error if validation fails, preventing the application from starting with invalid configurations
     * - ignoreEnvFile: boolean --> whether to ignore loading from .env files
     * - ignoreEnvVars: boolean --> whether to ignore loading from process.env
     */
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      // load: [configurations],
      // validationSchema: schema,
      // ignoreEnvFile: boolean,
      // ignoreEnvVars: boolean,
    }),

    // TypeOrmModule.forRoot(pgConfig),
    /**
     * Asynchronous TypeORM Configuration
     * - imports: []         --> modules to import for this configuration
     * - useFactory: () => {} --> factory function that returns the TypeORM configuration object. It can be async and can inject dependencies
     * - inject: []          --> list of providers to inject into the factory function
     * This setup allows dynamic configuration of TypeORM based on other services like ConfigService.
     * Uses forRootAsync instead of forRoot because it allows us to inject ConfigService to access environment variables for database configuration.
     * ConfigModule needs to be imported here to ensure ConfigService is available.
     * pgConfig is a function that takes ConfigService as an argument and returns the PostgresConnectionOptions object.
     * It must be wrapped in a factory function to be used here.
     * Inject ConfigService so it can be passed to pgConfig.
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigModule) => {
        return pgConfig(configService);
      },
      inject: [ConfigService],
    }),
    PropertyModule,
    OwnerModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
