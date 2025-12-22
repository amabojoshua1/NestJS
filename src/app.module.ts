import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { OwnerModule } from './owner/owner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PropertyModule, OwnerModule, TypeOrmModule.forRoot(pgConfig), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
