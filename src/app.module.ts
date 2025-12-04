import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { OwnerModule } from './owner/owner.module';
import { OwService } from './ow/ow.service';

@Module({
  imports: [PropertyModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService, OwService],
})
export class AppModule {}
