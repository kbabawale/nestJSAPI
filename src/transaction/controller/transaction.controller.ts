import { Body, Controller, HttpException, HttpStatus, Post, Session } from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import { transaction } from '../model/model';


@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) {

    }

    result: number;

    @Post()
    async transfer(@Body() transaction: transaction) {



        await this.transactionService.transfer(transaction);

        return {
            "Message": "Transfer Complete"
        };







    }
}
