import { Clock } from "@/res/icon/clock";
import { Pi } from "@/res/icon/pi";
import {
  Card,
  CardBody,
  Divider,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import AddOrder from "./addorder";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserMenuCard({ data, shopId, transcript }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [pi, setispi] = useState(null);
  const [notice, setnotice] = useState(false);
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

  const notify = () => {
    if (!notice) {
      toast(transcript["Order need to be on Pi Browser !"], {
        containerId: data.id,
      });
      setnotice(true);
    }
  };
  const checkorder = () => {
    if (pi) {
      onOpen();
    } else {
      notify();
    }
  };
  return (
    <>
      <Card>
        <CardBody onClick={checkorder} className="overflow-visible py-2 w-full">
          <div className="flex w-full flex-row">
            <div className="w-44 p-1 flex justify-center">
              <Image
                alt="Card background "
                className="!object-contain h-44 w-44"
                src={data.picture}
              />
            </div>
            <div className="grow p-1 flex flex-col">
              <h1 className="text-center font-semibold text-lg">{data.name}</h1>
              <Divider />
              <div className=" flex-auto">
                <p className="line-clamp-6 text-sm">{data.description}</p>
              </div>

              <div className="h-5 w-full flex justify-between px-5">
                <div className="h-full inline-flex">
                  <Clock className="h-5 w-5" />
                  <span className="h-5 items-center flex">
                    {data.time}
                    {` ${transcript["min"]}`}
                  </span>
                </div>
                <div className="h-full inline-flex">
                  <span className="h-5 items-center flex">{data.cost}</span>
                  <Pi className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <AddOrder
        transcript={transcript}
        shopId={shopId}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        data={data}
      />
      <ToastContainer containerId={data.id} />
    </>
  );
}
