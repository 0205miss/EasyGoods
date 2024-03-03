"use server";

import admin from "@/lib/firebase";
import PiNetwork from "pi-backend";

export async function claimearn(
  item,
  uid
) {

    const firestore = admin.firestore()
    const ref = firestore.collection('order').doc(item)
    const doc = await ref.get()
    if(!doc.exists){
        return '500'
    }else{
        //check data
        const data = doc.data()
        if(data.pickup && data.product && data.paid && data.method=='onlinepay'){
            //give away
            const pi = new PiNetwork(process.env.PI_API_KEY,process.env.PI_PRIVATE_SEED)
            let amount = await data.items.reduce((total, item) => parseFloat((total+item.cost * item.amount).toFixed(7)), 0)

            amount =  parseFloat((amount-0.01).toFixed(7))
            const paymentData = {
                amount: amount,
                memo: "EasyOrder A2B", // this is just an example
                metadata: {productId: item},
                uid: uid
              }
              // It is critical that you store paymentId in your database
              // so that you don't double-pay the same user, by keeping track of the payment.
              const paymentId = await pi.createPayment(paymentData);
              ref.set({pi_payment_id:paymentId},{merge:true})
              const txid = await pi.submitPayment(paymentId);
              ref.set({pi_tx_id:txid,status:'complete'},{merge:true})
              const completedPayment = await pi.completePayment(paymentId, txid);
              return true
        }else{
            return '500'
        }
    }

}
