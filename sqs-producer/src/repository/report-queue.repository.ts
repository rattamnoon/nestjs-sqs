import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReportQueue } from '../models/report-queue.model';

@Injectable()
export class ReportQueueRepository {
  constructor(
    @InjectModel(ReportQueue)
    private reportQueueModel: typeof ReportQueue,
  ) {}

  insert(record: ReportQueue) {
    return this.reportQueueModel.create(record);
  }
}
