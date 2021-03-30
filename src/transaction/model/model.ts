export interface transaction {
    reference?: number,
    amount: number,
    account: number
}

export interface balance {
    balance?: number,
    account?: number
}

export interface Res {
    message?: String,
    balance?: number
}