import { Module, ValidationPipe } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { Owner } from 'src/entities/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  controllers: [OwnerController],
  providers: [
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
    OwnerService,
  ],
})
export class OwnerModule {}
