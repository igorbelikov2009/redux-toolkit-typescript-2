import React, { FC } from "react";
import { ITodo } from "../../models/ITodo";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const deleteTodo = () => {
    console.log(todo);
  };

  return (
    <div className="post">
      <div>
        {todo.id}. {todo.title}
      </div>

      <button className="mt-2" onClick={() => deleteTodo()}>
        delete
      </button>
    </div>
  );
};

export default TodoItem;
