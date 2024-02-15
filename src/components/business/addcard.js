import AddIcon from "@/res/icon/add";
import { Card, CardBody } from "@nextui-org/react";

export default function AddCard({ order }) {
  return (
    <div className="w-full h-full px-4 py-2">
      <Card className="w-full h-full bg-primary">
        <CardBody>
          <div className="w-full h-full flex justify-center items-center flex-col">
            <div className="w-full">
              <div className="w-full flex justify-center">
                <div className=" w-32 stroke-secondary">
                  <AddIcon/>
                </div>
              </div>
              <h1 className="text-center text-secondary font-semibold text-4xl">
                Add Business
              </h1>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
