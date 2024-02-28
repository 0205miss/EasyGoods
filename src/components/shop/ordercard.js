import { Clock } from "@/res/icon/clock";
import { Minus } from "@/res/icon/minus";
import { Pi } from "@/res/icon/pi";
import { Plus } from "@/res/icon/plus";
import {
  Card,
  CardBody,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import { useContext } from "react";
import { CartContext } from "./ordercontext";

export default function UserOrderCard({ data }) {
    const { addToCart, removeFromCart  } = useContext(CartContext);
  const addamount = () =>{
    addToCart(data,1)
  }
  const minusamount = () =>{
    removeFromCart(data,1)
  }
  return (
    <>
      <Card>
        <CardBody className="overflow-visible py-2 w-full">
          <div className="flex w-full flex-row">
            <div className=" w-28 p-1 flex justify-center">
              <Image
                alt="Card background "
                className="!object-contain h-28 w-28"
                src={data.picture}
              />
            </div>
            <div className="grow p-1 flex flex-col">
              <h1 className=" text-left font-semibold text-medium">
                {data.name}
              </h1>
              <Divider />
              <div className="flex-auto">
                <p className="line-clamp-6 text-sm">{data.memo}</p>
              </div>
              <div className="flex justify-around mt-2 items-center">
                <Button
                  onClick={() => {minusamount()}}
                  isIconOnly
                  size="sm"
                  className="p-2 fill-white stroke-white bg-gradient-to-tr from-secondary-500 to-primary-500 text-white shadow-lg"
                >
                  <Minus />
                </Button>

                <div className=" h-10 flex justify-center items-center text-center text-2xl font-mono">
                  {data.amount}
                </div>

                <Button
                  onClick={() => {addamount()}}
                  size="sm"
                  isIconOnly
                  className="p-2 fill-white stroke-white bg-gradient-to-tr from-secondary-500 to-primary-500 text-white shadow-lg"
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
