import { Tabs, Tab } from "@nextui-org/react";

export default function OrderCard({ order, transcript }) {
  return (
    <div className="w-full h-full px-4 py-2 flex flex-col">
      <div className="flex justify-center">
        <Tabs color="secondary" classNames={{tabList:['bg-white']}}>
          <Tab key="progress" title={transcript["Progress"]}></Tab>
          <Tab key="history" title={transcript["History"]}></Tab>
        </Tabs>
      </div>
    </div>
  );
}
