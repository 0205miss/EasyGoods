'use client'
import { query, where,collection,getDocs } from "firebase/firestore";  
import { useContext, useEffect } from "react";
import { PiContext } from "./pi";
import { db } from "@/components/firestore";

export default function BusinessSelector({children}){

    let Pi = useContext(PiContext)
    useEffect(()=>{
        const scopes = ['payments','username','wallet_address','roles'];
        function onIncompletePaymentFound(payment) { /* ... */ };
        Pi.authenticate(scopes, onIncompletePaymentFound).then(async function(auth) {
            const shopRef = collection(db, "shop");
            const q = query(shopRef, where("owner", "array-contains", auth.user.username));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
              console.log('No matching documents.');
            }else{
              querySnapshot.forEach(doc => {
                let data = doc.data()
                console.log(data)
              });
            }
          }).catch(function(error) {
            console.error(error);
            console.log("pi sdk failed")
          });

    },[])
    
    return <select
    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center"
  >
    
  </select>
}