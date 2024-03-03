import { claimearn } from "@/action/claimearn"
import { completeearn } from "@/action/completeearn"
import { submitearn } from "@/action/submitearn"
import { OwnerContext } from "@/app/[lang]/business/business"
import { Button, Spinner } from "@nextui-org/react"
import { useContext, useState } from "react"

export default function ClaimEarnButton({item}){
    const {ownerauth} = useContext(OwnerContext)
    const [state,setstate] = useState(0)
    return (
        <Button className="w-full mt-4" color="primary" isDisabled={state==0 ? false :true} onClick={async()=>{
            setstate(1)
            const payment_id = await claimearn(item.id,ownerauth.user.uid)
            if(payment_id){
              const txid = await submitearn(item.id,payment_id)
              if(txid){
                const complete = await completeearn(item.id,payment_id,txid)
              }
            }             
            
            }}>{state==0 ? 'Claim Earn' : <Spinner color="warning"/>}</Button>
    )
}