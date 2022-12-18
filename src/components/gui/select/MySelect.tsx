import React, { FC } from "react";
import Form from "react-bootstrap/Form";

export interface IOption {
  value: any;
  name: string | number;
}

interface MySelectProps {
  titleSelect?: string;
  options: IOption[];
  defaultValue: string;
  value: string | number;
  onChangeValue: (value: any) => void;
  disabled: boolean;
}

const MySelect: FC<MySelectProps> = ({ titleSelect, options, defaultValue, value, onChangeValue, disabled }) => {
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChangeValue(value);
  };

  return (
    <>
      <h6 className="textCenter colorBlueSky mb-2">{titleSelect}</h6>

      <Form.Select aria-label="Default select example" value={value} onChange={selectChange}>
        <option disabled={disabled} value="">
          {defaultValue}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default MySelect;
