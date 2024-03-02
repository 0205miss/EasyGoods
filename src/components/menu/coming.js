import { Card, CardBody } from "@nextui-org/react";

export default function ComingSoon() {
  return (
    <div className="w-full h-full px-4 py-2">
      <Card className="w-full h-full bg-primary">
        <CardBody className="flex justify-center items-center text-text-400 text-4xl font-bold">
          Coming Soon
        </CardBody>
      </Card>
    </div>
  );
}
