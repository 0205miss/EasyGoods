"use server";

import admin from "@/lib/firebase";
import PiNetwork from "pi-backend";

export async function completeearn(
  item,
  paymentId,
  txid
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
              const completedPayment = await pi.completePayment(paymentId, txid);
              await ref.set({pi_tx_id:txid,status:'complete'},{merge:true})   
              return true
        }else{
            return false
        }
    }

}
