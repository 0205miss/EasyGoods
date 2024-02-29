"use client";
import { auth } from "@/action/auth";
import Script from "next/script";
import { createContext, useState } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { auth_firebase } from "@/components/firestore";
import { incompletepay } from "@/action/incomplete";

export const PiContext = createContext();

export default function PiUser({ children,transcript }) {
  const [pi, setpi] = useState(null);
  const [piauth, setauth] = useState(null);
  const firebase_auth = async (token) => {

    const data_token = await auth(token);
    if(data_token=='unkyc'){
      setfirebase(false);
    }else{
      signInWithCustomToken(auth_firebase, data_token)
      .then((userCredential) => {
        console.log(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    }
    
  };
  const loadpi = () => {
    window.Pi.init({
      version: "2.0",
      sandbox: process.env.NEXT_PUBLIC_APP_SANDBOX == "true" ? true : false,
    }).catch(function (error) {
      console.error(error);
      console.log("pi sdk failed");
    });
    const scopes = ["payments", "username", "wallet_address", "roles"];
    function onIncompletePaymentFound(payment) {
      console.log(1)
      incompletepay(payment)
    }
    window.Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(function (auth) {
        console.log(auth)
        setauth(auth)
        firebase_auth(auth.accessToken);
      })
      .catch(function (error) {
        console.error(error);
        console.log("pi sdk failed");
      });
    setpi(window.Pi);
  };


    return (
      <>
        <Script src="https://sdk.minepi.com/pi-sdk.js" onLoad={loadpi}></Script>
        <PiContext.Provider value={{pi,piauth}}>{children}</PiContext.Provider>
      </>
    );
  
}
