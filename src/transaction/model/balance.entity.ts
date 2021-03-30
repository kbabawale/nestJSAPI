import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('balances')
export class BalanceEntity {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ unique: true })
    account: number;

    @Column()
    balance: number;

}