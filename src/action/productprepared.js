"use server";

import admin from "@/lib/firebase";

export async function productprepared(order_id) {
  const firestore = admin.firestore();
  const ref = firestore.collection("order").doc(order_id);
  await ref.update({
    product: true,
  });
  return true;
}
