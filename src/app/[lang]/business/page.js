'use client'
import { Button, Dropdown, DropdownMenu, DropdownSection, DropdownTrigger,DropdownItem } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { OwnerContext } from "./business";
import LoadingPage from "@/components/loading";


export default function BusinessPage() {
  const snap = useContext(OwnerContext)
  const [currentshop,setcurrentshop] = useState(null)
  const [shoplist,setshoplist] = useState([])
  useEffect(()=>{
    if(snap==null) return
    if(snap.empty){
      setcurrentshop('')
    }else{
      let count = 0
      if(shoplist.length!=0){
        setshoplist([])
      }
      snap.forEach(doc => {
        let data = doc.data()
        if(count==0){
          setcurrentshop(data.name)
          count++
        }
        setshoplist([...shoplist,data])
      });
    }
  },[snap])
  if(snap==null) return <LoadingPage/>
  return <div className="w-full h-full">
    <div className="flex w-full px-5 py-3">
    <Dropdown>
    <DropdownTrigger>
      <Button variant="bordered" className="w-full">
        {currentshop==''?"You don't have business yet":currentshop}
      </Button>
    </DropdownTrigger>
    <DropdownMenu variant="faded" aria-label="" className="w-80">
      {currentshop=='' ? null : <DropdownSection showDivider>
        
      {
        shoplist.map(doc=>{
          return <DropdownItem
                key={doc.name}
              >
                {doc.name}
              </DropdownItem>
        })
      }
      </DropdownSection>}
      <DropdownSection>
      <DropdownItem
            key="new"
            shortcut="+"
            description="Create a new shop"
          >
            Add Bussiness
          </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
    </Dropdown>
    </div>
      
    </div>;
}
