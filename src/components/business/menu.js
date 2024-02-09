import AddIcon from "@/res/icon/add";
import { Button, Divider, Switch, cn } from "@nextui-org/react";
import { useState } from "react";

export default function MenuBusiness({data}) {
  const[piaccept,setpiaccept]=useState(data.payment)
  return (
    <div className="w-full h-full px-4 py-2">
      <Switch
      isSelected={piaccept} onValueChange={setpiaccept}
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
      <Divider className="my-2"/>
      

      <div className="w-full flex h-10 stroke-accent-500 justify-center">
        <Button isIconOnly className="flex justify-center py-1 items-center bg-gradient-to-tr from-primary-500 to-secondary shadow-lg w-full h-full">
            <div className="h-8 w-8">
            <AddIcon/>
            </div>        
        </Button>
        
      </div>
    </div>
  );
}
