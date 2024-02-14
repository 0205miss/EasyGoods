'use client'
import { useDisclosure,Button, Dropdown, DropdownMenu, DropdownSection, DropdownTrigger,DropdownItem, Tab, Tabs, Spinner } from "@nextui-org/react";
import { useContext, useEffect, useState,useMemo } from "react";
import { OwnerContext } from "./business";
import LoadingPage from "@/components/loading";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/components/firestore";
import OrderCard from "@/components/business/ordercard";
import dynamic from "next/dynamic";
import AddBusinessModal from "@/components/business/addbusiness";

export default function BusinessPage({params}) {
  const snap = useContext(OwnerContext)
  const {isOpen,onOpen,onClose} = useDisclosure()
  const [currentshop,setcurrentshop] = useState(null)
  const [shoplist,setshoplist] = useState([])
  const [selected,setSelected] = useState('order')
  useEffect(()=>{
    if(snap==null) return
    if(snap.empty){
      setcurrentshop(null)
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
            <Spinner color="warning" size="lg"/>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const AddCard = useMemo(
    () =>
      dynamic(() => import("@/components/business/addcard"), {
        loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="warning" size="lg"/>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const MenuBusiness = useMemo(
    () =>
      dynamic(() => import("@/components/business/menu"), {
        loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="warning" size="lg"/>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const AddBusinessModal = useMemo(
    ()=>
    dynamic(()=>import('@/components/business/addbusiness'),{
      loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="warning" size="lg"/>
          </div>
        ),
        ssr: false,
    })
  )
  
  useEffect(()=>{
    console.log(currentshop)
    if(currentshop==null) return
    console.log(shoplist[currentshop].id)
    const q = query(collection(db, "offer"), where("shop", "==",shoplist[currentshop].id ));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
      cities.push(doc.data().buyer);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
  },[currentshop])

const handledropdown = (key) =>{
  if(key=='new'){
    onOpen()
  }
}

  if(snap==null || shoplist==null) return <LoadingPage/>
  return <div className="w-full h-full">
    <div className="flex w-full px-5 py-3">
    <Dropdown>
    <DropdownTrigger>
      <Button variant="bordered" className="w-full bg-ui-secondary text-white">
        {shoplist.length==0 ? "You don't have business yet": shoplist[currentshop].name}
      </Button>
    </DropdownTrigger>
    <DropdownMenu variant="faded" aria-label="" className="w-80" onAction={handledropdown}>
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
        {shoplist.length==0 ? <AddCard/>:
        selected=='order' ?
        <OrderCard/>:selected=='stamp'?
        'stamp':selected=='menu'?
        <MenuBusiness data={shoplist[currentshop]}/>:<InfoBusiness info={shoplist[currentshop]}/>
        }
      </div>

      <div className="fixed bottom-0 w-full h-16 pb-6">
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
      <AddBusinessModal isOpen={isOpen} onClose={onClose} lang={params.lang}/>
    </div>;
}
