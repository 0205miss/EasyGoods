import { Address } from "@/res/icon/address";
import {
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ShopModal({ isOpen, onOpenChange, data }) {
  const [checkopen, setcheckopen] = useState(null);
  const [size, setsize] = useState("md");
  useEffect(() => {
    const now = new Date();
    const start =
      parseInt(data.opening.substring(0, 2)) * 60 +
      parseInt(data.opening.substring(3, 5));
    const end =
      parseInt(data.opening.substring(6, 8)) * 60 +
      parseInt(data.opening.substring(9, 11));
    const current = now.getHours() * 60 + now.getMinutes();
    console.log(now.getDay().toString());
    console.log(data.openday);
    if (!data.openday.includes(now.getDay().toString())) {
      setcheckopen(false);
    } else if (start > current && current > end) {
      setcheckopen(false);
    } else {
      setcheckopen(true);
    }
    console.log(data.openday.sort());
  }, [data]);
  if (checkopen == null) return;
  return (
    <Modal
      isOpen={isOpen}
      placement="bottom-center"
      onOpenChange={onOpenChange}
      size={size}
      onClose={() => setsize("md")}
    >
      <ModalContent>
        <ModalHeader>
          <div className="block w-full">
            <div>{data.name}</div>
            <div className="!text-sm text-slate-600 font-medium">
              {data.type == "coffee"
                ? "Coffee Shop"
                : data.type == "Restaurant"
                ? "Restaurant"
                : data.type == "Grocery"
                ? "Grocery"
                : data.type == "BookStore"
                ? "BookStore"
                : data.type == "Bakery"
                ? "Bakery"
                : data.type == "Hotel"
                ? "Hotel"
                : "Other"}
            </div>
            <div
              className={
                !checkopen ? "!text-sm text-red-500" : "text-green-500 !text-sm"
              }
            >
              {!checkopen ? "close" : "opening"}
            </div>
            <div className=" fill-secondary-500 h-7 flex justify-start">
              <div className="h-7 w-7">
                <Address />
              </div>
              <div className=" text-sm h-7 leading-inherit">{data.address}</div>
            </div>

            <Divider />

            {data.photo.length != 0 && (
              <div className="flex overflow-x-scroll h-52 py-2 gap gap-2">
                {data.photo.toReversed().map((url, i) => {
                  return (
                    <div className=" flex-none" key={i}>
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

            {size == "md" && (
              <div className="mt-2 w-full flex justify-center">
                <Button onClick={() => setsize("full")}>More</Button>
              </div>
            )}
          </div>
        </ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
}
