import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import countries from "@/res/country.json";
import { useState } from "react";
export default function InfoBusiness({ info }) {
  const [value, setValue] = useState("TW");

  const edit = () => {
    console.log(countries);
  };
  return (
    <div className="w-full h-full px-3">
      <div className="w-full h-full flex flex-col gap gap-4">
        <Input
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
        />
        <Select
          labelPlacement="outside"
          label="Category"
          placeholder="Select an animal"
          fullWidth
          classNames={{
            trigger: ["bg-primary", "h-12", "!text-white"],
            value: "!text-white",
            label: "!text-accent text-md font-semibold text-center w-full",
          }}
        >
          <SelectItem key="coffee" value="Coffee Shop">
            Coffee Shop
          </SelectItem>
          <SelectItem key="Restaurant" value="Restaurant">
            Restaurant
          </SelectItem>
          <SelectItem key="Grocery" value="Grocery">
            Grocery
          </SelectItem>
          <SelectItem key="BookStore" value="BookStore">
            BookStore
          </SelectItem>
          <SelectItem key="Bakery" value="Bakery">
            Bakery
          </SelectItem>
          <SelectItem key="Other" value="Other">
            Other
          </SelectItem>
        </Select>
        <Input
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
        />
        <Autocomplete
          label="Country"
          labelPlacement="outside"
          placeholder="Select country"
          selectedKey={value}
          classNames={{}}
          inputProps={{
            classNames: {
              label: "!text-accent text-md font-semibold text-center w-full",
              input: "!text-white focus:text-black",
              inputWrapper: "!bg-primary ",
            },
          }}
          selectorButtonProps={{
            className: "!text-white",
          }}
          onSelectionChange={setValue}
          isClearable={false}
        >
          {countries.map((item) => {
            return (
              <AutocompleteItem
                key={item.cca2}
                value={item.cca2}
                startContent={
                  <Avatar
                    alt="Venezuela"
                    className="w-6 h-6"
                    src={item.flags.svg}
                  />
                }
              >
                {item.name.common}
              </AutocompleteItem>
            );
          })}
        </Autocomplete>
      </div>
    </div>
  );
}
