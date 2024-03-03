"use client";
import { auth } from "@/action/auth";
import Script from "next/script";
import { createContext, useState,useRef, useEffect } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { auth_firebase } from "@/components/firestore";
import { incompletepay } from "@/action/incomplete";
import { db } from "@/components/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import LoadingPage from "@/components/loading";

export const PiContext = createContext();

export default function PiUser({ children }) {
  const unsub = useRef()
  const [pi, setpi] = useState(null);
  const [piauth, setauth] = useState(null);
  const [history, sethistory] = useState([]);
  const [ongoing, setongoing] = useState([]);
  const [firebase,setfirebase] = useState(false)
  const [ispi,setispi] = useState(null)
  const listenorder = () => {
    const q = query(
      collection(db,'order'),
      where('buyer','==',piauth.user.username)
    )
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) =>{
        querySnapshot.docChanges().forEach((change)=>{
          if(change.type === 'added'){
            if(change.doc.data().pickup){
              sethistory((old)=>[
                ...old,{...change.doc.data(),id:change.doc.id}
              ])
            }else{
              setongoing((old)=>[
                ...old,{...change.doc.data(),id:change.doc.id}
              ])
            }
          }

          if(change.type === 'modified'){
            if (change.doc.data().pickup) {
              setongoing((old) => old.filter((item) => item.id !== change.doc.id));
              sethistory((old) => [
                ...old,
                { ...change.doc.data(), id: change.doc.id },
              ]);
            }else{
              setongoing( (old) =>{
                return old.map((item) =>
                  item.id === change.doc.id ? { ...change.doc.data(), id: change.doc.id } : item
                )
              }
              );
            }
          }
        })
      }
    )

      unsub.current = unsubscribe;
  }

useEffect(()=>{
  if (
    window.location.ancestorOrigins[0] == "https://sandbox.minepi.com" ||
    window.location.ancestorOrigins[0] == "https://app-cdn.minepi.com"
  ) {
    setispi(true);
  } else {
    setispi(false);
  }
  return () =>{
    unsub.current && unsub.current()
  }
},[])

useEffect(()=>{
  if(firebase){
    listenorder()
  }
},[firebase])

useEffect(()=>{
  console.log(ongoing)
},[ongoing])

  const firebase_auth = async (token) => {

    const data_token = await auth(token);
    if(data_token=='unkyc'){
      setfirebase(false);
    }else{
      signInWithCustomToken(auth_firebase, data_token)
      .then((userCredential) => {
        setfirebase(true)
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
  
    if(ispi==false && ispi != null){
      return (
        <>
          <Script src="https://sdk.minepi.com/pi-sdk.js" onLoad={loadpi}></Script>
          {children}
        </>
      );
    }else if (ispi == null || pi == null || firebase == null) {
      return (
        <>
          <Script
            src="https://sdk.minepi.com/pi-sdk.js"
            onReady={loadpi}
          ></Script>
          <LoadingPage/>
        </>
      );
    }else if (ispi == true && firebase == true){
    return (
      <>
        <Script src="https://sdk.minepi.com/pi-sdk.js" onLoad={loadpi}></Script>
        <PiContext.Provider value={{pi,piauth,ongoing,history}}>{children}</PiContext.Provider>
      </>
    );
    }
}
