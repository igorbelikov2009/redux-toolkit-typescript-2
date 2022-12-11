import React, { FC } from "react";
import { Form, Button } from "react-bootstrap";
import FormControl from "../gui/input/FormControl";

export interface IFormsOfCreation {
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

interface FormCreationProps {
  formsOfCreation: IFormsOfCreation[];
  addObject: React.MouseEventHandler<HTMLButtonElement>;
  ButtonName: string;
}
const FormCreation: FC<FormCreationProps> = ({ formsOfCreation, addObject, ButtonName }) => {
  return (
    <Form>
      {formsOfCreation.map((obj, index) => (
        <FormControl
          value={obj.value}
          placeholder={obj.placeholder}
          setValue={obj.setValue}
          type={obj.type}
          key={index}
        />
      ))}

      <Button variant="outline-success" onClick={addObject}>
        {ButtonName}
      </Button>
    </Form>
  );
};

export default FormCreation;
