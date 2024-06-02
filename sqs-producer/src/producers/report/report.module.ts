import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ReportProducerService } from './report.service';
import { config } from '../../config';

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: config.REPORT_QUEUE_NAME,
          queueUrl: config.REPORT_QUEUE_URL,
          region: config.AWS_REGION,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [ReportProducerService],
  exports: [ReportProducerService],
})
export class ReportProducerModule {}
