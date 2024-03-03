import { productprepared } from "@/action/productprepared";
import { OwnerContext } from "@/app/[lang]/business/business";
import { Accordion, AccordionItem, Button, Divider } from "@nextui-org/react";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";

export default function OrderAccordion({ data }) {
  const {ownerauth} = useContext(OwnerContext)
  const [time, setTime] = useState(dayjs());

   const finishprepare = (id) =>{
    productprepared(id)
   }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      setTime(now);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Accordion
      variant="splitted"
      itemClasses={{
        base: "py-0 w-full !bg-secondary-50 !text-secondary",
        title: "!text-secondary",
        trigger: " px-2 rounded-lg h-14 flex items-center",
      }}
    >
      {data.map((item, index) => {
        let expire = item.ordertime.seconds,pireceived=0
        item.items.map((product) => {
          expire += product.spend * 60 * product.amount;
          pireceived += parseFloat((product.cost * product.amount).toFixed(7))
        });
        
        return (
          <AccordionItem
            key={index}
            title={item.buyer}
            subtitle={
              item.pickup && item.product ?'Claimable Order':
              item.product ? 'Waiting Customer':
              time.isBefore(dayjs.unix(expire))
                ? -time.diff(dayjs.unix(expire), "m") + " min"
                : "Time's up"
            }
          >
            <div className=" text-center">OrderID : <span className='text-center uppercase'>{item.id.substring(0,5)}</span></div>
            <Divider/>
            {item.items.map((product,index) => {
              return (
                <div className="grid grid-cols-5" key={index}>
                  <div className="col-span-2 text-left">{product.name}</div>
                  <div className="col-span-2 text-left">{product.memo}</div>
                  <div className="col-span-1 text-right">{product.amount}</div>
                </div>
              );
            })}
            <Divider/>
            <div className="flex justify-between">
                <div>Received</div>
                <div>{parseFloat(pireceived.toFixed(7))}</div>
            </div>
            <div className="flex justify-between">
                <div>Status</div>
                <div>{item.paid ?'Paid' : 'unPaid'}</div>
            </div>
            {item.product && item.pickup && <Button className="w-full mt-4" color="primary" onClick={()=>claimearn(item.id,ownerauth.user.uid)}>Claim Earn</Button>}
            {!item.product && <Button className="w-full mt-4" color="primary" onClick={()=>finishprepare(item.id)}>Prepared</Button>}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
