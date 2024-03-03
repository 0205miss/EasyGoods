"use server";

import admin from "@/lib/firebase";
import PiNetwork from "pi-backend";

export async function submitearn(
  item,
  paymentId
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
              // It is critical that you store paymentId in your database
              // so that you don't double-pay the same user, by keeping track of the payment.
              const txid = await pi.submitPayment(paymentId);
              await ref.set({pi_tx_id:txid,status:'complete'},{merge:true})              
              return txid
        }else{
            return false
        }
    }

}
