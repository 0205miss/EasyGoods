"use server";

import admin from "@/lib/firebase";

export async function paymentcomplete(
  token,
  username,
  payment_id,
  transaction_id
) {
  const res = await fetch("https://api.minepi.com/v2/me", {
    headers: new Headers({
      Authorization: "Bearer " + token,
    }),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  } else {
    let auth = await res.json();
    if (auth.username == username) {
      const complete = await fetch(
        `https://api.minepi.com/v2/payments/${payment_id}/complete`,
        {
          body: JSON.stringify({
            txid: transaction_id,
          }),
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: "Key " + process.env.PI_API_KEY,
          }),
        }
      );
      if(complete.ok){
        const com = await complete.json();
        const firestore = admin.firestore()
        const ref = firestore.collection('order').doc(com.metadata.order)
        await ref.update({paid: true,status:'ongoing'});
        return true
      }else{
        return false
      }
    } else {
      return "wrong user";
    }
  }
}
