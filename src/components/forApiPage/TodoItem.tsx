import React, { FC } from "react";
import { ITodo } from "../../models/types";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const deleteTodo = () => {
    console.log(todo);
  };

  return (
    <Card className="post">
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
        <b> {todo.completed ? "Выполнено" : "Не выполнено"}</b>
      </i>

      <div className="maxWidth232">
        <Button variant="outline-danger" className="mt-2 " onClick={() => deleteTodo()}>
          Удалить
        </Button>
      </div>
    </Card>
  );
};

export default TodoItem;
