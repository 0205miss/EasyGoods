import AddIcon from "@/res/icon/add";
import { Button, Divider, Switch, cn, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import MenuCard from "./menucard";
import MenuModal from "./addmenu";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firestore";

export default function MenuBusiness({ data,setdata,index }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [piaccept, setpiaccept] = useState(data.payment);
  const [orderaccept, setorderaccept] = useState(data.apporder);
  const [menu, setmenu] = useState([]);

  useEffect(() => {
    getmenu();
  }, []);

  const getmenu = async () => {
    const querySnapshot = await getDocs(
      collection(db, "shop", data.id, "menu")
    );
    if (querySnapshot.empty){

    }else{
      let allmenu = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setmenu([...allmenu]);
    }
    
  };
  
  const updateshop = async (pi,order) =>{
    const ref = doc(db,'shop',data.id)
    await updateDoc(ref,{
      payment:pi,
      apporder:order
    })
  }

  useEffect(()=>{
    updateshop(piaccept,orderaccept)
  },[piaccept,orderaccept])

  return (
    <div className="w-full h-full px-4 py-2">
      <Switch
        isSelected={orderaccept}
        onValueChange={setorderaccept}
        classNames={{
          base: cn(
            "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
            "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
            "data-[selected=true]:border-primary"
          ),
          wrapper: "p-0 h-4 overflow-visible",
          thumb: cn(
            "w-6 h-6 border-2 shadow-lg",
            "group-data-[hover=true]:border-primary",
            //selected
            "group-data-[selected=true]:ml-6",
            // pressed
            "group-data-[pressed=true]:w-7",
            "group-data-[selected]:group-data-[pressed]:ml-4"
          ),
        }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-medium">EasyGoods Order</p>
          <p className="text-tiny text-default-400">
            Customer can make order on this app
          </p>
        </div>
      </Switch>
      <Divider className="my-2" />
      {orderaccept && (
        <>
          <Switch
            isSelected={piaccept}
            onValueChange={setpiaccept}
            classNames={{
              base: cn(
                "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary"
              ),
              wrapper: "p-0 h-4 overflow-visible",
              thumb: cn(
                "w-6 h-6 border-2 shadow-lg",
                "group-data-[hover=true]:border-primary",
                //selected
                "group-data-[selected=true]:ml-6",
                // pressed
                "group-data-[pressed=true]:w-7",
                "group-data-[selected]:group-data-[pressed]:ml-4"
              ),
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-medium">Pi Payment</p>
              <p className="text-tiny text-default-400">
                Customer can pay on this app
              </p>
            </div>
          </Switch>
          <Divider className="my-2" />
        </>
      )}

      <div className="w-full flex h-10 stroke-accent-500 justify-center">
        <Button
          onClick={onOpen}
          isIconOnly
          className="flex justify-center py-1 items-center bg-gradient-to-tr from-primary-500 to-secondary shadow-lg w-full h-full"
        >
          <div className="h-8 w-8">
            <AddIcon />
          </div>
        </Button>
      </div>
      <div className="mt-3 overflow-y-scroll h-[calc(100%_-_9rem)]">
        <div className="pb-2 flex flex-col gap gap-3 ">
          {menu.length != 0 &&
            menu.map((item,i) => {
              if(item == 0){
                return null
              }
              return <MenuCard shopId={data.id} data={item} key={i} index={i} setmenu={setmenu} menu={menu}/>;
            })}
        </div>
      </div>
      <MenuModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        data={data}
        setmenu={setmenu}
      />
    </div>
  );
}
