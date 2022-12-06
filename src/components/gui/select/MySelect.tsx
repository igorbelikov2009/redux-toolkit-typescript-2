import React, { FC } from "react";

export interface IOption {
  value: string;
  name: string;
}

interface MySelectProps {
  options: IOption[];
  defaultValue: string;
  value: string | number;
  onChangeValue: (value: string) => void;
  disabled: boolean;
}

const MySelect: FC<MySelectProps> = ({ options, defaultValue, value, onChangeValue, disabled }) => {
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChangeValue(value);
  };

  return (
    <select value={value} onChange={selectChange}>
      <option disabled={disabled} value="">
        {defaultValue}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
