"use client";

import { useContext, useState } from "react";
import { PiContext } from "@/app/[lang]/(customer)/pi";
import { Tab, Tabs } from "@nextui-org/react";
import OrderOnGoingAccordion from "./ongoingcard";

export default function OrderUserPage({ transcript }) {
  const [tab, settab] = useState("progress");
  const { ongoing } = useContext(PiContext);
  return (
    <div className="w-full h-full px-4 py-2 flex flex-col overflow-scroll">
      <div className="flex justify-center mb-3">
        <Tabs
          color="secondary"
          classNames={{
            tabList: ["bg-white"],
            base: ["flex justify-center mt-3"],
          }}
          selectedKey={tab}
          onSelectionChange={settab}
        >
          <Tab key="progress" title={transcript["Progress"]}></Tab>
          <Tab key="history" title={transcript["History"]}></Tab>
        </Tabs>
      </div>
      {tab == "progress" && (
        <OrderOnGoingAccordion
          transcript={transcript}
          data={ongoing.sort((a, b) => {
            return b.ordertime.seconds - a.ordertime.seconds;
          })}
        />
      )}
    </div>
  );
}
