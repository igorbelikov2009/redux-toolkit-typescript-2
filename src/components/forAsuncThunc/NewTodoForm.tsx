import React, { FC } from "react";
import { Button } from "react-bootstrap";

interface NewTodoFormProps {
  value: string;
  updateText: (e: any) => void;
  handleAction: () => void;
}

// const updateText = (e: React.ChangeEvent) => {
//   e.target.value;
// };

const NewTodoForm: FC<NewTodoFormProps> = ({ value, updateText, handleAction }) => {
  return (
    <label>
      <input value={value} onChange={(e) => updateText(e.target.value)} />
      <Button onClick={handleAction} variant="outline-success" className="ml-2">
        Add todo
      </Button>
    </label>
  );
};

export default NewTodoForm;
