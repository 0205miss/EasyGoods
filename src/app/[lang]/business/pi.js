'use client'
import LoadingPage from "@/components/loading";
import UnAuth from "@/components/unauth";
import Script from "next/script";
import { createContext, useEffect, useState } from "react";
const PiContext = createContext()
export default function PiUser({children}){
    const [pi,setpi] = useState(null)
    const [ispi,setispi] = useState(null)
    const loadpi = () =>{
        window.Pi.init({ version: "2.0",sandbox:process.env.NEXT_PUBLIC_APP_SANDBOX=='true'?true:false }).catch(function(error) {
            console.error(error);
            console.log("pi sdk failed")
          });
        const scopes = ['payments','username','wallet_address','roles'];
        function onIncompletePaymentFound(payment) { /* ... */ };
        window.Pi.authenticate(scopes, onIncompletePaymentFound).then(function(auth) {
            console.log(`Hi there! You're ready to make payments!`);
            console.log(auth);
          }).catch(function(error) {
            console.error(error);
            console.log("pi sdk failed")
          });
        setpi(window.Pi)
    }

    useEffect(()=>{
        if(window.location.ancestorOrigins[0]=='https://sandbox.minepi.com' || window.location.ancestorOrigins[0]=='https://app-cdn.minepi.com'){
            setispi(true)
        }else{
            setispi(false)
        }
    },[])
    if(ispi == false && ispi!=null){
        return <UnAuth/>
    }
    else if(ispi==null||pi==null){
        return <>
        <Script src="https://sdk.minepi.com/pi-sdk.js" onLoad={loadpi}></Script>
        <LoadingPage/>
        </>
    }
    else if(ispi == true){
        return (
            <>
            <Script src="https://sdk.minepi.com/pi-sdk.js" onLoad={loadpi}></Script>
            <PiContext.Provider value={pi}>
                {children}
            </PiContext.Provider>
            </>        
        )
    }
    
}