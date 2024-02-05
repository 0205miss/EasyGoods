import EditIcon from "@/res/icon/edit";
import { Select, SelectItem, Avatar, Input } from "@nextui-org/react";
import countries from '@/res/country.json'
export default function InfoBusiness({ info }) {
  const edit = () => {
    console.log(countries);
  };
  return (
    <div className="w-full h-full px-3">
      <div className="w-full h-full flex flex-col gap gap-4">
        <Input
          isReadOnly
          labelPlacement="outside"
          color="secondary"
          type="text"
          label="Business Name"
          variant="bordered"
          defaultValue="junior@nextui.org"
          className="w-full"
          classNames={{
            inputWrapper: ["bg-primary", "h-12"],
            input: ["text-white"],
            label: "text-accent text-md font-semibold text-center w-full",
          }}
          endContent={
            <div
              className="flex items-center  h-11 w-11 stroke-accent-500 p-1 rounded"
              onClick={edit}
            >
              <div className="bg-secondary h-full rounded p-1">
                <EditIcon />
              </div>
            </div>
          }
        />
        
        <Input
          isReadOnly
          labelPlacement="outside"
          color="secondary"
          type="text"
          label="Location"
          variant="bordered"
          defaultValue="新北市新莊區"
          className="w-full"
          classNames={{
            inputWrapper: ["bg-primary", "h-12"],
            input: ["text-white"],
            label: "text-accent text-md font-semibold text-center w-full",
          }}
          endContent={
            <div
              className="flex items-center h-11 w-11 stroke-accent-500 p-1 rounded"
              onClick={edit}
            >
              <div className="bg-secondary h-full rounded p-1">
                <EditIcon />
              </div>
            </div>
          }
        />
        <Select label="Select country">
          {countries.map(item=>{
            return <SelectItem key={item.cca2} startContent={<Avatar alt="Venezuela" className="w-6 h-6" src={item.flags.svg} />}>
                {item.name.common}
            </SelectItem>
          })}
        </Select>
      </div>
    </div>
  );
}
