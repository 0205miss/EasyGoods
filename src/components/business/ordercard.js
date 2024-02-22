import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

export default function OrderCard({ order,transcript }) {
  return (
    <div className="w-full h-full px-4 py-2">
      <Card className="w-full h-full bg-primary">
        <CardHeader className="flex justify-center">
          <Tabs color="secondary">
            <Tab key="progress" title={transcript["Progress"]}></Tab>
            <Tab key="history" title={transcript["History"]}></Tab>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
