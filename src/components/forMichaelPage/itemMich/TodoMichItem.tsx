import React, { FC } from "react";
import { ITodo } from "../../../models/types";
import { Card, Button } from "react-bootstrap";
import { useAppDispanch } from "../../../hooks/redux";
import { deleteTodoMich, toggledStatusMich } from "../../../store/michReducer/todoMichReducer";

const TodoMichItem: FC<ITodo> = ({ id, title, completed, userId }) => {
  const dispatch = useAppDispanch();

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteTodoMich(id));
  };

  const handleCheckbox = (event: React.ChangeEvent) => {
    dispatch(toggledStatusMich(id));
  };

  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> пользователь № </i> <b> {userId} </b>
          </Card.Title>

          <i className="displayBlock">
            <i> дело № </i> <b> {id} </b>
          </i>

          <i className="displayBlock">
            <i> описание дела: </i> <b> {title} </b>
          </i>

          <input type="checkbox" checked={completed} onChange={handleCheckbox} />

          <i className="displayBlock">
            <span className={completed ? "colorBlue textLine" : "colorRed"}>
              {completed ? "Выполнено" : "Не выполнено"}
            </span>
          </i>
        </div>

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2" onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodoMichItem;
