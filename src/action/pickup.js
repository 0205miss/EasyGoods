"use server";

import admin from "@/lib/firebase";

export async function userPickUp(order_id) {
  const firestore = admin.firestore();
  const ref = firestore.collection("order").doc(order_id);
  await ref.set({
    pickup: true,
    pickuptime: admin.firestore.FieldValue.serverTimestamp(),
  },{merge:true});
  return true;
}