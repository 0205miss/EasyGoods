import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import OrderAccordion from "./orderaccordion";

export default function OrderCard({ ongoing, history, transcript }) {
  const [tab, settab] = useState("progress");
  
  return (
    <div className="w-full h-full px-4 py-2 flex flex-col overflow-scroll">
      <div className="flex justify-center mb-3">
        <Tabs
          color="secondary"
          classNames={{ tabList: ["bg-white"] }}
          selectedKey={tab}
          onSelectionChange={settab}
        >
          <Tab key="progress" title={transcript["Progress"]}></Tab>
          <Tab key="history" title={transcript["History"]}></Tab>
        </Tabs>
      </div>
      {tab=='progress'&&<OrderAccordion transcript={transcript} data={ongoing.sort((a, b) => {
      return b.ordertime.seconds - a.ordertime.seconds;
    })}/>}
    </div>
  );
}
