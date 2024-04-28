import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import {P2PTransactions} from "../../../components/p2pTransferCard";

async function getAllTransactions(){
    const session = await getServerSession(authOptions);
    if (!session?.user || !session?.user?.id){
        return {
            message : "Invalid Authentication!!"
        }
    }
    const fromTxns = await prisma.p2pTransfer.findMany({
        where:{
            fromUserId : Number(session?.user?.id)
        }
    })
    
    const toTxns = await prisma.p2pTransfer.findMany({
        where : {
            toUserId : Number(session?.user?.id)
        }
    })

    let allTxns

    if (fromTxns && fromTxns[0]){
        allTxns = fromTxns.map((t: any) =>({
            time: t.timestamp,
            amount: t.amount,
            number: t.fromUserId,
            sign: "-"
        }))
    }

    let final_all

    if(toTxns && toTxns[0]){
        const temp = toTxns.map((t:any) => ({
            time: t.timestamp,
            amount: t.amount,
            number: t.toUserId,
            sign: "+"
        }))
    
        final_all=allTxns.concat(temp);
    }

    return final_all
}

export default async function() {
    
    const recentTransactions = await getAllTransactions();
    
    return <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transactions
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div className="pt-4">
                    <P2PTransactions transactions = {recentTransactions} />
                </div>
            </div>
        </div>
}