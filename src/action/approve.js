"use server";

export async function paymentapprove(token,username,payment_id) {
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
    if(auth.username==username){
        const res = await fetch(`https://api.minepi.com/v2/payments/${payment_id}/approve`, {
            method:'POST',
            headers: new Headers({
              Authorization: "Key " + process.env.PI_API_KEY,
            }),
          });
          return true
    }else{
      return 'wrong user';
    }
    
  }
}