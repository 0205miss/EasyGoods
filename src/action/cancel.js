"use server";

import admin from "@/lib/firebase";

export async function ordercancel(
  token,
  username,
  order_id
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
        const firestore = admin.firestore()
        const ref = firestore.collection('order').doc(order_id)
        await ref.delete();
        return true
      
    } else {
      return "wrong user";
    }
  }
}
