import { Module, ValidationPipe } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

@Module({
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
