import { Select, SelectItem } from "@nextui-org/react";

export default function WeekSelect({ values, setValues,transcript }) {
  return (
    <Select
      label="Opening Day"
      selectionMode="multiple"
      placeholder="Select the day"
      selectedKeys={values}
      onSelectionChange={setValues}
    >
      <SelectItem key={1} value={1}>
        {transcript['Monday']}
      </SelectItem>
      <SelectItem key={2} value={2}>
        {transcript['Tuesday']}
      </SelectItem>
      <SelectItem key={3} value={3}>
        {transcript['Wednesday']}
      </SelectItem>
      <SelectItem key={4} value={4}>
        {transcript['Thursday']}
      </SelectItem>
      <SelectItem key={5} value={5}>
        {transcript['Friday']}
      </SelectItem>
      <SelectItem key={6} value={6}>
        {transcript['Saturday']}
      </SelectItem>
      <SelectItem key={0} value={0}>
        {transcript['Sunday']}
      </SelectItem>
    </Select>
  );
}
