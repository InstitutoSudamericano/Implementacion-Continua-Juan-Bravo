import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { FeeRulesService } from './fee-rules.service';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],
  controllers: [RequestController],
  providers: [RequestService, FeeRulesService],
  exports: [RequestService],
})
export class RequestModule {}

