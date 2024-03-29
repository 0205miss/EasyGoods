"use client";
import { query, where, collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { PiContext } from "./pi";
import { db } from "@/components/firestore";

export const OwnerContext = createContext();

export default function BusinessSelector({ children }) {
  const [ownershops, setshops] = useState(null);
  const [ownerauth, setownerauth] = useState(null);
  let Pi = useContext(PiContext);
  useEffect(() => {
    const scopes = ["payments", "username", "wallet_address", "roles"];
    function onIncompletePaymentFound(payment) {
      /* ... */
    }
    Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(async function (auth) {
        setownerauth(auth)
        const shopRef = collection(db, "shop");
        const q = query(
          shopRef,
          where("owner", "array-contains", auth.user.username)
        );
        const querySnapshot = await getDocs(q);
        setshops(querySnapshot);
      })
      .catch(function (error) {
        console.error(error);
        console.log("pi sdk failed");
      });
  }, []);

  return (
    <OwnerContext.Provider value={{ ownershops, setshops,ownerauth }}>
      {children}
    </OwnerContext.Provider>
  );
}
