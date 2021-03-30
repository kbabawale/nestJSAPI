import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../model/transaction.entity';
import { Repository } from 'typeorm';
import { BalanceEntity } from '../model/balance.entity';
import { balance, Res, transaction } from '../model/model';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';

@Injectable()
export class TransactionService {

    public inputData: BehaviorSubject<transaction> = new BehaviorSubject({ amount: 0, account: 0 });
    public res: Subject<number> = new Subject();
    public ress: number = 0;

    constructor(@InjectRepository(TransactionEntity) private readonly transactionEntity: Repository<TransactionEntity>,
        @InjectRepository(BalanceEntity) private readonly balanceEntity: Repository<BalanceEntity>) { }

    async transfer(obj) {
        this.inputData.next(obj);

        try {

            let sub = this.inputData.pipe(
                debounceTime(2000)
            )
                .subscribe(data => {
                    if (data.account > 0 && data.amount > 0) {
                        (async () => {
                            await this.addTransaction(obj);

                            //find account and update with new balance
                            let oldBalance = await this.findAccount(data.account);


                            let newObj: balance = {
                                balance: oldBalance.balance + data.amount
                            };
                            await this.updateBalance(oldBalance.id, newObj);


                        })();


                    }


                });


        } catch (err) {
            return {
                "Message": "An Error Occurred"
            }
        }
    }

    findAccount(account: number) {
        return this.balanceEntity.findOne({ account });
    }

    addTransaction(obj: transaction) {
        return this.transactionEntity.save(obj);
    }

    addBalance(obj: balance) {
        return this.balanceEntity.save(obj);
    }

    updateBalance(id: number, obj: balance) {
        return this.balanceEntity.update(id, obj);
    }
}

