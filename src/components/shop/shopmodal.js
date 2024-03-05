import { Address } from "@/res/icon/address";
import {
  Badge,
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firestore";
import { Back } from "@/res/icon/back";
import { Cart } from "@/res/icon/cart";
import { CartContext } from "./ordercontext";
import UserMenuCard from "./menucard";
import CreateOrder from "./createorder";
import { ToastContainer, toast } from "react-toastify";

export default function ShopModal({ isOpen, onOpenChange, data, onClose,transcript }) {
  const createorder = useDisclosure()
  const [checkopen, setcheckopen] = useState(null);
  const [size, setsize] = useState("md");
  const [menu, setmenu] = useState([]);
  const [pi,setispi] = useState(null)
  const { cartItems } = useContext(CartContext);

  const getmenu = async () => {
    const querySnapshot = await getDocs(
      collection(db, "shop", data.id, "menu")
    );
    if (querySnapshot.empty) {
      setmenu([]);
    } else {
      let allmenu = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setmenu([...allmenu]);
    }
  };
  const checkpi = () =>{
    if(!data.apporder){
      toast(transcript["Shop is not support EasyOrder !"]);
    }else if(pi && data.apporder){
      createorder.onOpen()
    }else{
      toast(transcript["Order need to be on Pi Browser !"]);
    }
  }

  
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

  useEffect(() => {
    getmenu();
  }, [data]);

  useEffect(() => {
    const now = new Date();
    const start =
      parseInt(data.opening.substring(0, 2)) * 60 +
      parseInt(data.opening.substring(3, 5));
    const end =
      parseInt(data.opening.substring(6, 8)) * 60 +
      parseInt(data.opening.substring(9, 11));
    const current = now.getHours() * 60 + now.getMinutes();
    if (!data.openday.includes(now.getDay().toString())) {
      setcheckopen(false);
    } else if (start > current && current > end) {
      setcheckopen(false);
    } else {
      setcheckopen(true);
    }
  }, [data]);

  useEffect(() => {
    if (size != "full") return;
  }, [size]);

  useEffect(() => {
    setsize("md");
  }, [isOpen]);

  if (checkopen == null) return;
  return (
    <>
    <Modal
      isOpen={isOpen}
      placement="bottom-center"
      onOpenChange={onOpenChange}
      size={size}
      hideCloseButton={size == "full" ? true : false}
    >
      <ModalContent>
        {size == "full" && (
          <ModalHeader>
            <div className="w-full flex justify-around">
              <Button
                onClick={() => {
                  onClose();
                }}
                isIconOnly
                className="p-2 fill-white bg-gradient-to-tr from-secondary-500 to-primary-500 text-white shadow-lg"
              >
                <Back />
              </Button>
              <div className="flex justify-center items-center">EasyOrder</div>
              <Badge
                content={cartItems.length}
                color="warning"
                variant="shadow"
                className="!border-transparent"
              >
                <Button
                  isIconOnly
                  onClick={checkpi}
                  className="p-2 stroke-white bg-gradient-to-tr from-secondary-500 to-primary-500 text-white shadow-lg"
                >
                  <Cart />
                </Button>
              </Badge>
            </div>
          </ModalHeader>
        )}
        <div
          className={
            size == "full"
              ? "overflow-scroll h-[calc(100vh_-_4.5rem)]"
              : undefined
          }
          key={'body-full-key'}
        >
          <ModalBody>
            <div className="block w-full">
              <div className="text-large font-semibold">{data.name}</div>
              <div className="!text-sm text-slate-600 font-medium">
                {data.type == "coffee"
                  ? transcript["Coffee Shop"]
                  : data.type == "Restaurant"
                  ? transcript["Restaurant"]
                  : data.type == "Grocery"
                  ? transcript["Grocery"]
                  : data.type == "BookStore"
                  ? transcript["BookStore"]
                  : data.type == "Bakery"
                  ? transcript["Bakery"]
                  : data.type == "Hotel"
                  ? transcript["Hotel"]
                  : transcript["Other"]}
              </div>
              <div
                className={
                  !checkopen
                    ? "!text-sm text-red-500"
                    : "text-green-500 !text-sm"
                }
              >
                {!checkopen ? transcript["close"] : transcript["opening"]}
              </div>
              <div className=" fill-secondary-500 flex justify-start items-center">
                <div className="h-7 w-7">
                  <Address />
                </div>
                <div className=" text-sm leading-normal">{data.address}</div>
              </div>

              <Divider />

              {data.photo.length != 0 && (
                <div className="flex overflow-x-scroll h-52 py-2 gap gap-2">
                  {data.photo.toReversed().map((url, i) => {
                    return (
                      <div className=" flex-none" key={url}>
                        <Image
                          className="!object-cover w-48 h-48"
                          radius="md"
                          src={url}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              <Divider />
            </div>

            {size == "full" &&
              menu.length != 0 &&
              menu.map((item, i) => {
                if (item == 0) {
                  return null;
                }
                return (
                    <UserMenuCard transcript={transcript} shopId={data.id} data={item} key={item.id} />
                );
              })}

            {size == "md" && (
              <div className="mt-2 w-full flex justify-center">
                <Button onClick={() => setsize("full")} color="secondary">
                  {transcript['More']}
                </Button>
              </div>
            )}
          </ModalBody>
        </div>
      </ModalContent>
    </Modal>
    <CreateOrder transcript={transcript} isOpen={createorder.isOpen} onOpenChange={createorder.onOpenChange} onClose={createorder.onClose}/>
    <ToastContainer containerId={data.id}/>
    </>
  );
}
