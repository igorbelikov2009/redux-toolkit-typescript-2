import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useAppDispanch } from "../../hooks/redux";
import { deleteTodo, toggledStatus } from "../../store/todoSeparSlice";

interface TodoItemProps {
  userId?: number | string | null;
  id: number;
  title: string;
  completed: boolean;
}

const TodoSeparItem: FC<TodoItemProps> = ({ id, title, completed, userId }) => {
  const dispatch = useAppDispanch();

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteTodo(id));
  };

  const handleCheckbox = (event: React.ChangeEvent) => {
    dispatch(toggledStatus(id));
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
          <Button variant="outline-danger" className="mt-2 " onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodoSeparItem;
