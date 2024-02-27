import { Clock } from "@/res/icon/clock";
import { Minus } from "@/res/icon/minus";
import { Pi } from "@/res/icon/pi";
import { Plus } from "@/res/icon/plus";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Image,
  Divider,
  Textarea,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./ordercontext";

export default function AddOrder({ isOpen, onOpenChange, shopId, data }) {
  const [memo, setmemo] = useState("");
  const [amount, setamount] = useState(1);
  const [spend, setspend] = useState(1 * data.time);
  const [cost, setcost] = useState(1 * 0.03);
  const {addToCart,checkshop,clearCart} = useContext(CartContext)
    useEffect(()=>{
        setspend(amount*data.time)
        setcost(parseFloat((amount*0.03).toFixed(7)))
    },[amount])

    const addproduct = () =>{
        if(!checkshop(shopId)){
            clearCart()
            
        }
        const order = {
            id : data.id,
            amount : amount,
            name : data.name,
            memo : memo,
            spend : spend,
            cost : cost,
            shop:shopId
        }
        addToCart(order)        
    }
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true}
      backdrop="blur"
      placement="center"
      size="sm"
    >
      <ModalContent>
        <ModalHeader className="flex justify-center items-center">
          {data.name}
        </ModalHeader>

        <ModalBody>
          <Divider />
          <div className="flex flex-col">
            <div className=" flex justify-center items-center">
              <Image
                alt="Card background "
                className="!object-contain h-44 !rounded-none"
                src={data.picture}
              />
            </div>

            <div className="text-center">{data.description}</div>
            <Textarea
              color="secondary"
              value={memo}
              onValueChange={setmemo}
              label="Memo"
            />

            <div className="mt-2 h-5 w-full flex justify-between px-5 text-accent">
              <div className="h-full inline-flex fill-accent">
                <Clock className="h-5 w-5" />
                <span className="h-5 items-center flex">{spend} min</span>
              </div>
              <div className="h-full inline-flex fill-accent">
                <span className="h-5 items-center flex">{cost}</span>
                <Pi className="h-5 w-5" />
              </div>
            </div>

            <div className="flex justify-around mt-2">
              <Button
              onClick={() => setamount(amount - 1)}
                isIconOnly
                className="p-2 fill-white stroke-white bg-gradient-to-tr from-secondary-500 to-primary-500 text-white shadow-lg"
              >
                <Minus />
              </Button>

                <div className=" h-10 flex justify-center items-center text-center text-2xl font-mono">
                    {amount}
                </div>

              <Button
              onClick={() => setamount(amount + 1)}
                isIconOnly
                className="p-2 fill-white stroke-white bg-gradient-to-tr from-secondary-500 to-primary-500 text-white shadow-lg"
              >
                <Plus/>
              </Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center">
            <Button color="primary" className=" uppercase" onClick={addproduct}>
                Add
            </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
