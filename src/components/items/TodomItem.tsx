import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { ITodom } from "../../models/types";

interface TodomItemProps {
  todom: ITodom;
  remove: (todom: ITodom) => void;
  update: (todom: ITodom) => void;
}

const TodomItem: FC<TodomItemProps> = ({ todom, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(todom);
  };

  const handleCheckbox = (event: React.ChangeEvent) => {
    let completed = !todom.completed;
    update({ ...todom, completed });
  };

  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> дело № </i> <b> {todom.id} </b>
          </Card.Title>

          <i className="displayBlock">
            <i> описание дела: </i> <b> {todom.title} </b>
          </i>

          <input type="checkbox" checked={todom.completed} onChange={handleCheckbox} />

          <i className="displayBlock">
            <span className={todom.completed ? "colorBlue textLine" : "colorRed"}>
              {todom.completed ? "Выполнено" : "Не выполнено"}
            </span>
          </i>
        </div>

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2 " onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodomItem;
