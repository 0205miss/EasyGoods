import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import countries from "@/res/country.json";
export default function CountrySelector() {
  return (
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
  );
}
