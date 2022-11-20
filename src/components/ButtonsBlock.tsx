import React, { FC } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface IButton {
  id: number;
  handle: () => void;
  title: string;
}

interface ButtonsBlockProps {
  buttons: IButton[];
}

const ButtonsBlock: FC<ButtonsBlockProps> = ({ buttons }) => {
  return (
    <ButtonGroup aria-label="Basic example">
      {buttons.map((button) => (
        <Button key={button.id} onClick={button.handle} variant="outline-primary">
          {button.title}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ButtonsBlock;
