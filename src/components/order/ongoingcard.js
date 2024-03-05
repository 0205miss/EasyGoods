"use client";
import { userPickUp } from "@/action/pickup";
import { Correct } from "@/res/icon/check";
import { Confirm } from "@/res/icon/confirm";
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function OrderOnGoingAccordion({ data, transcript }) {
  const [time, setTime] = useState(dayjs());
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [pickstatus, setpickstatus] = useState(false);
  const [select, setselect] = useState(null);
  const pickup = () => {
    const pick = userPickUp(select.id);
    if (pick) {
      setpickstatus(true);
    } else {
      alert("something wrong");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      setTime(now);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Accordion
        variant="splitted"
        itemClasses={{
          base: "py-0 w-full !bg-secondary-50 !text-secondary",
          title: "!text-secondary",
          trigger: " px-2 rounded-lg h-14 flex items-center",
        }}
      >
        {data.map((item, index) => {
          let expire = item.ordertime.seconds,
            pireceived = 0;
          item.items.map((product) => {
            expire += product.spend * 60 * product.amount;
            pireceived += parseFloat(
              (product.cost * product.amount).toFixed(7)
            );
          });

          return (
            <AccordionItem
              key={index}
              title={item.buyer}
              subtitle={
                item.product
                  ? transcript["Waiting PickUp"]
                  : time.isBefore(dayjs.unix(expire))
                  ? -time.diff(dayjs.unix(expire), "m") +
                    ` ${transcript["min"]}`
                  : transcript["Delay"]
              }
            >
              <div className=" text-center">{transcript["Order"]}</div>
              <Divider />
              {item.items.map((product, index) => {
                return (
                  <div className="grid grid-cols-5" key={index}>
                    <div className="col-span-2 text-left">{product.name}</div>
                    <div className="col-span-2 text-left">{product.memo}</div>
                    <div className="col-span-1 text-right">
                      {product.amount}
                    </div>
                  </div>
                );
              })}
              <Divider />
              <div className="flex justify-between">
                <div>{transcript["Cost"]}</div>
                <div>{parseFloat(pireceived.toFixed(7))}</div>
              </div>
              <div className="flex justify-between">
                <div>{transcript["Status"]}</div>
                <div>
                  {item.paid ? transcript["Paid"] : transcript["unPaid"]}
                </div>
              </div>
              {item.product && (
                <Button
                  className="w-full mt-4"
                  color="primary"
                  onClick={() => {
                    setselect(item);
                    onOpen();
                  }}
                >
                  {transcript["Complete"]}
                </Button>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => setpickstatus(false)}
      >
        <ModalContent>
          <ModalBody>
            {pickstatus && (
              <>
                <div className=" flex justify-center">
                  <div className=" fill-green-500 w-32 h-32 p-5">
                    <Correct />
                  </div>
                </div>
                <p className="text-center text-xl">EasyOrder</p>
                <Divider />
                <div className="text-center">
                  {transcript["OrderID : "]}
                  <span className="text-center uppercase">
                    {select != null && select.id.substring(0, 5)}
                  </span>
                </div>
                <div className="text-center">
                  {transcript["Please show this page to Business"]}
                </div>
              </>
            )}
            {!pickstatus && (
              <>
                <div className=" flex justify-center">
                  <div className=" fill-orange-500 w-32 h-32 p-5">
                    <Confirm />
                  </div>
                </div>
                <p className="text-center text-xl">EasyOrder</p>
                <Divider />
                <div className="text-center">
                  {transcript["OrderID : "]}
                  <span className="text-center uppercase">
                    {select != null && select.id.substring(0, 5)}
                  </span>
                </div>
                <div className="text-center">
                  {transcript["Confirm you pick up the order"]}
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter className="justify-center">
            {!pickstatus && (
              <>
                <Button
                  className="w-full mt-4"
                  color="danger"
                  onClick={onClose}
                >
                  {transcript["Not yet"]}
                </Button>
                <Button
                  className="w-full mt-4"
                  color="secondary"
                  onClick={pickup}
                >
                  {transcript["Pick Up"]}
                </Button>
              </>
            )}
            {pickstatus && (
              <Button
                className="w-full mt-4"
                color="danger"
                onClick={() => {
                  onClose();
                  setpickstatus(false);
                }}
              >
                {transcript["Close"]}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
