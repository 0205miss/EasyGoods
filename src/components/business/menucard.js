import { Clock } from "@/res/icon/clock";
import { Pi } from "@/res/icon/pi";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";

export default function MenuCard({data}) {
  return (
    <Card>
      <CardBody className="overflow-visible py-2 w-full">
        <div className="flex w-full flex-row">
          <div className="w-1/2 p-1">
            <Image
              alt="Card background "
              className="!object-contain h-44"
              src={data.pricture}
            />
          </div>
          <div className="w-1/2 p-1 flex flex-col">
            <h1 className="text-center font-semibold text-lg">
              {data.name}
            </h1>
            <Divider />
            <div className=" flex-auto">
            <p className="line-clamp-6 text-sm">
              {data.description}
            </p>
            </div>
            
            <div className="h-5 w-full flex justify-between px-5">
              <div className="h-full inline-flex">
                <Clock className="h-5 w-5" />
                <span className="h-5 items-center flex">{data.time} min</span>
              </div>
              <div className="h-full inline-flex">
                <span className="h-5 items-center flex">{data.cost}</span>
                <Pi className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}