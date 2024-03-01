import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useContext } from "react";
import { CartContext } from "./ordercontext";
import UserOrderCard from "./ordercard";
import { PiContext } from "@/app/[lang]/(customer)/pi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firestore";
import { paymentapprove } from "@/action/approve";
import { paymentcomplete } from "@/action/complete";
import { useRouter,usePathname  } from 'next/navigation'
import { ordercancel } from "@/action/cancel";

export default function CreateOrder({ isOpen, onOpenChange, onClose }) {
  const { cartItems, getCartTotal, getCartTotalPrepare, clearCart } =
    useContext(CartContext);
  const { pi, piauth } = useContext(PiContext);
  const router = useRouter()
  const pathname = usePathname()
  const createpay = async () => {
    const docRef = await addDoc(collection(db, "order"), {
      buyer: piauth.user.username,
      shop: cartItems[0].shop,
      ordertime: serverTimestamp(),
      items: cartItems,
      product:false,
      paid: false,
      status: "pending",
    });
    pi.createPayment(
      {
        // Amount of π to be paid:
        amount: getCartTotal(),
        // An explanation of the payment - will be shown to the user:
        memo: "EasyOrder", // e.g: "Digital kitten #1234",
        // An arbitrary developer-provided metadata object - for your own usage:
        metadata: { order: docRef.id }, // e.g: { kittenId: 1234 }
      },
      {
        // Callbacks you need to implement - read more about those in the detailed docs linked below:
        onReadyForServerApproval: function (paymentId) {
          paymentapprove(piauth.accessToken, piauth.user.username, paymentId);
        },
        onReadyForServerCompletion: function (paymentId, txid) {
          paymentcomplete(
            piauth.accessToken,
            piauth.user.username,
            paymentId,
            txid
          );
          clearCart();
          router.replace(`${pathname.replace('map','order')}`)
          onClose();
        },
        onCancel: function (paymentId) {
          ordercancel(piauth.accessToken, piauth.user.username,docRef.id)
        },
        onError: function (error, payment) {
          /* ... */
        },
      }
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      hideCloseButton={true}
    >
      <ModalContent>
        <ModalHeader className="flex justify-center text-2xl">
          Order
        </ModalHeader>
        <ModalBody>
          <div className="overflow-scroll max-h-96 p-2">
            <div className="flex flex-col gap gap-2">
              {cartItems.map((item, index) => {
                return <UserOrderCard data={item} key={index} />;
              })}
              {cartItems.length == 0 && (
                <div className="flex justify-center items-center h-[23rem]">
                  There has no any product in Cart
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex justify-end">
              <div className="">Prepare Time</div>
              <div className="flex-none w-28">
                {getCartTotalPrepare()}
                <span className="pl-1">min</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="">Total Cost</div>
              <div className="flex-none w-28">
                {getCartTotal()}
                <span className="pl-1">Pi</span>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Cancel
          </Button>
          <Button color="warning" onClick={createpay}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
