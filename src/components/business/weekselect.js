import { Select, SelectItem } from "@nextui-org/react";

export default function WeekSelect({ values, setValues }) {
  return (
    <Select
      label="Opening Day"
      selectionMode="multiple"
      placeholder="Select the day"
      selectedKeys={values}
      onSelectionChange={setValues}
    >
      <SelectItem key={1} value={1}>
        Monday
      </SelectItem>
      <SelectItem key={2} value={2}>
        Tuesday
      </SelectItem>
      <SelectItem key={3} value={3}>
        Wednesday
      </SelectItem>
      <SelectItem key={4} value={4}>
        Thursday
      </SelectItem>
      <SelectItem key={5} value={5}>
        Friday
      </SelectItem>
      <SelectItem key={6} value={6}>
        Saturday
      </SelectItem>
      <SelectItem key={7} value={7}>
        Sunday
      </SelectItem>
    </Select>
  );
}
