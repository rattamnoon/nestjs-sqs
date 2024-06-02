import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportProducerModule } from './producers/report/report.module';
import { RepositoryModule } from './repository';
import { DatabaseModule } from './database';
import { ModelsModule } from './models';

@Module({
  imports: [
    DatabaseModule,
    ReportProducerModule,
    RepositoryModule,
    ModelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
