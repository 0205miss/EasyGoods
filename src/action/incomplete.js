"use server";

import admin from "@/lib/firebase";

export async function incompletepay(payment) {
  const res = await fetch(
    `https://api.minepi.com/v2/payments/${payment.identifier}/complete`,
    {
      body: JSON.stringify({
        txid: payment.transaction.txid,
      }),
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Key " + process.env.PI_API_KEY,
      }),
    }
  );
  if(res.ok){
    const com = await res.json();
    const firestore = admin.firestore()
    const ref = firestore.collection('order').doc(com.metadata.order)
    await ref.update({paid: true});
    return true
  }else{
    return false
  }
}
