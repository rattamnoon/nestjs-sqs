import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { ReportQueueStatus } from 'src/enums/report-queue-status.enum';
import { ReportQueue } from 'src/models/report-queue.model';
import { ReportQueueRepository } from 'src/repository/report-queue.repository';
import { ReportPayload } from 'src/types/report-payload';
import { v4 } from 'uuid';
import { config } from '../../config';

@Injectable()
export class ReportProducerService {
  constructor(
    private readonly sqsService: SqsService,
    private readonly reportQueueRepository: ReportQueueRepository,
  ) {}
  async sendMessage(body: ReportPayload) {
    try {
      // generate report with status in-queue to be processed later by a worker
      const report = await this.reportQueueRepository.insert({
        id: v4(),
        payload: body,
        status: ReportQueueStatus.IN_QUEUE,
      } as ReportQueue);

      // sends message to the queue with the report id
      await this.sqsService.send(config.REPORT_QUEUE_NAME, {
        id: v4(),
        body: JSON.stringify({
          id: report.id,
        }),
      });
      console.log(`message send it with report id: ${report.id}`);
    } catch (error) {
      console.log('error in producing message for report queue', error);
    }
  }
}
