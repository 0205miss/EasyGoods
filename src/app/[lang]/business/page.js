'use client'
import { Button, Dropdown, DropdownMenu, DropdownSection, DropdownTrigger,DropdownItem, Tab, Tabs } from "@nextui-org/react";
import { useContext, useEffect, useState,useMemo } from "react";
import { OwnerContext } from "./business";
import LoadingPage from "@/components/loading";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/components/firestore";
import OrderCard from "@/components/business/ordercard";
import dynamic from "next/dynamic";

export default function BusinessPage() {
  const snap = useContext(OwnerContext)
  const [currentshop,setcurrentshop] = useState(null)
  const [shoplist,setshoplist] = useState([])
  const [selected,setSelected] = useState('order')
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
          setcurrentshop(0)
          count++
        }
        data.id = doc.id
        setshoplist([...shoplist,data])
        
      });
    }
  },[snap])
  const InfoBusiness = useMemo(
    () =>
      dynamic(() => import("@/components/business/info"), {
        loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-10 w-10 text-amber-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  useEffect(()=>{
    if(currentshop==null) return
    const q = query(collection(db, "offer"), where("shop", "==",shoplist[currentshop].id ));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().buyer);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
  },[currentshop])

  if(snap==null || shoplist==null) return <LoadingPage/>
  return <div className="w-full h-full">
    <div className="flex w-full px-5 py-3">
    <Dropdown>
    <DropdownTrigger>
      <Button variant="bordered" className="w-full bg-ui-secondary text-white">
        {shoplist.length==0 ? "You don't have business yet": shoplist[currentshop].name}
      </Button>
    </DropdownTrigger>
    <DropdownMenu variant="faded" aria-label="" className="w-80">
      {shoplist.length==0 ? null : <DropdownSection showDivider>
        
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
      
      <div className=" pb-16 h-[calc(100%-64px)]">
        {
        selected=='order' ?
        <OrderCard/>:selected=='stamp'?
        'stamp':selected=='menu'?
        'menu':<InfoBusiness/>
        }
      </div>

      <div className="fixed bottom-0 w-full h-16 py-3">
        <div className=" flex justify-center">
          <div className=" w-72">
        <Tabs key='1' color="primary"  aria-label="Tabs colors" radius="full" fullWidth={true} selectedKey={selected} onSelectionChange={setSelected}>
          <Tab key="order" title="Order"/>
          <Tab key="stamp" title="Stamp"/>
          <Tab key="menu" title="Menu"/>
          <Tab key="info" title="Info"/>
        </Tabs>
        </div>
        </div>
      </div>
    </div>;
}
