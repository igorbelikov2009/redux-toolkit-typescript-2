import React, { FC } from "react";
import { ITodo } from "../../models/types";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const deleteTodo = () => {
    console.log("deleteTodo ");
  };

  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> У пользователя под номером: </i> <b> {todo.userId} </b>
          </Card.Title>

          <i className="displayBlock">
            <i> дело № </i> <b> {todo.id}</b>
          </i>

          <i className="displayBlock">
            <i> описание дела: </i> <b> {todo.title} </b>
          </i>

          <i className="displayBlock">
            <b className={todo.completed ? "colorBlue" : "colorRed"}>{todo.completed ? "Выполнено" : "Не выполнено"}</b>
          </i>
        </div>

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2 " onClick={() => deleteTodo()}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodoItem;
