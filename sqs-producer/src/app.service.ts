import { Injectable } from '@nestjs/common';
import { ReportProducerService } from './producers/report/report.service';

@Injectable()
export class AppService {
  constructor(private readonly producer: ReportProducerService) {}

  generateReport(): string {
    this.producer.sendMessage({
      userId: Math.floor(100000 * Math.random()),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });

    return 'sended';
  }
}
