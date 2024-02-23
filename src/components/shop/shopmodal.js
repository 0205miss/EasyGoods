import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ShopModal({ isOpen, onOpenChange, data }) {
  const [checkopen, setcheckopen] = useState(null);

  useEffect(() => {
    const now = new Date();
    const start =
      parseInt(data.opening.substring(0, 2)) * 60 +
      parseInt(data.opening.substring(3, 5));
    const end =
      parseInt(data.opening.substring(6, 8)) * 60 +
      parseInt(data.opening.substring(9, 11));
    const current = now.getHours() * 60 + now.getMinutes();
    console.log(now.getDay().toString())
    console.log(data.openday)
    if (!data.openday.includes(now.getDay().toString())) {
      setcheckopen(false);
    } else if (start > current && current > end) {
      setcheckopen(false);
    } else {
      setcheckopen(true);
    }
  }, [data]);
  if(checkopen==null) return
  return (
    <Modal
      isOpen={isOpen}
      placement="bottom-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader>
          <div className="block">
            <div>{data.name}</div>
            <div
              className={
                !checkopen
                  ? "!text-sm text-red-500"
                  : data.opening == "00:00~23:59"
                  ? "!text-sm text-green-500"
                  : "text-green-500 !text-sm"
              }
            >
                {!checkopen ? 'close' : data.opening == "00:00~23:59"
                ? "24hr":"opening"}
            </div>
          </div>
        </ModalHeader>
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
}
