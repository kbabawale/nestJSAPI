import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module'
import { TransactionEntity } from './transaction/model/transaction.entity';
import { BalanceEntity } from './transaction/model/balance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'guessguess',
      database: 'atomdb',
      entities: [TransactionEntity, BalanceEntity],
      synchronize: true,
    }),
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
