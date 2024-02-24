"use server";
import admin from "@/lib/firebase";
export async function auth(token) {
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
    if(auth.roles.includes("kyc_accepted")){
      let uid = auth.username;
      let customtoken = await admin.auth().createCustomToken(uid);
      return customtoken;
    }else{
      return 'unkyc';
    }
    
  }
}
