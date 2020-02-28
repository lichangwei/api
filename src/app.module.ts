import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';

@Module({
  imports: [RenderModule, ApiModule],
  controllers: [AppController],
})
export class AppModule {}
