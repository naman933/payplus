import { Card } from "@repo/ui/card"

export const P2PTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        number: string,
        // TODO: Can the type of `status` be more specific?
        sign: "+" | "-"
    }[]
}) => {
    if (!transactions.length || transactions[0]?.amount==NaN) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        {t.sign == "+" ? "Received INR" : "Sent INR"}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t?.time?.toDateString()} {t.sign=="+"? "From" : "To"} {"User " + t.number}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    {t.sign} Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}