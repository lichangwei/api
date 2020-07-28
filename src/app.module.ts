import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [RenderModule, ApiModule, ExportModule],
  controllers: [AppController],
})
export class AppModule {}
