import React, { FC } from "react";
import { Form } from "react-bootstrap";

interface FormControlProps {
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const FormControl: FC<FormControlProps> = ({ type, value, setValue, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Form.Control
        className="mb-2 fullWidth"
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
    </>
  );
};

export default FormControl;
