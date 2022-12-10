import React, { FC } from "react";
import { ITodo } from "../../../models/types";
import { Card, Button } from "react-bootstrap";
import { useAppDispanch } from "../../../hooks/redux";
import { deleteTodoMich, toggledStatusMich } from "../../../store/michReducer/todoMichReducer";

interface TodoMichItemProps {
  todo: ITodo;
}

const TodoMichItem: FC<TodoMichItemProps> = ({ todo }) => {
  const dispatch = useAppDispanch();

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteTodoMich(todo.id));
  };

  const handleCheckbox = (event: React.ChangeEvent) => {
    dispatch(toggledStatusMich(todo.id));
  };

  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> пользователь № </i> <b> {todo.userId} </b>
          </Card.Title>

          <i className="displayBlock">
            <i> дело № </i> <b> {todo.id} </b>
          </i>

          <i className="displayBlock">
            <i> описание дела: </i> <b> {todo.title} </b>
          </i>

          <input type="checkbox" checked={todo.completed} onChange={handleCheckbox} />

          <i className="displayBlock">
            <span className={todo.completed ? "colorBlue textLine" : "colorRed"}>
              {todo.completed ? "Выполнено" : "Не выполнено"}
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
