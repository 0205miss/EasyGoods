"use client";
import { auth } from "@/action/auth";
import LoadingPage from "@/components/loading";
import UnAuth from "@/components/unauth";
import Script from "next/script";
import { createContext, useEffect, useState } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { auth_firebase } from "@/components/firestore";
import UnKYC from "@/components/unkyc";

export const PiContext = createContext();

export default function PiUser({ children,transcript }) {
  const [pi, setpi] = useState(null);
  const [ispi, setispi] = useState(null);
  const [firebase, setfirebase] = useState(null);
  const firebase_auth = async (token) => {
    const data_token = await auth(token);
    if(data_token=='unkyc'){
      setfirebase(false);
    }else{
      signInWithCustomToken(auth_firebase, data_token)
      .then((userCredential) => {
        setfirebase(true);
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
      /* ... */
    }
    window.Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(function (auth) {
        firebase_auth(auth.accessToken);
      })
      .catch(function (error) {
        console.error(error);
        console.log("pi sdk failed");
      });
    setpi(window.Pi);
  };

  useEffect(() => {
    if (
      window.location.ancestorOrigins[0] == "https://sandbox.minepi.com" ||
      window.location.ancestorOrigins[0] == "https://app-cdn.minepi.com"
    ) {
      setispi(true);
    } else {
      setispi(false);
    }
  }, []);
  if (ispi == false && ispi != null) {
    return <UnAuth transcript={transcript}/>;
  } else if (ispi == null || pi == null || firebase == null) {
    return (
      <>
        <Script
          src="https://sdk.minepi.com/pi-sdk.js"
          onReady={loadpi}
        ></Script>
        <LoadingPage />
      </>
    );
  } else if (ispi == true && firebase == false) {
    return <UnKYC transcript={transcript}/>
  } else if (ispi == true && firebase == true) {
    return (
      <>
        <Script src="https://sdk.minepi.com/pi-sdk.js" onLoad={loadpi}></Script>
        <PiContext.Provider value={pi}>{children}</PiContext.Provider>
      </>
    );
  }
}
