import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './model/transaction.entity';
import { BalanceEntity } from './model/balance.entity';
import { TransactionController } from './controller/transaction.controller';
import { NestSessionOptions, SessionModule } from 'nestjs-session';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, BalanceEntity]),
    SessionModule.forRoot({
      session: { secret: 'gibrish' },
    }),
  ],
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule { }
