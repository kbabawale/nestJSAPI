import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    reference: number;

    @Column()
    amount: number;

    @Column()
    account: number;
}