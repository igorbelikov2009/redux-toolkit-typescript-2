import React from "react";
import { todoAPI } from "../../services/TodoService";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
  // параметр 10 - это мы задаём значение для limit
  const { data: todos, error, isLoading } = todoAPI.useFetchAllTodosQuery(10);

  return (
    <div>
      <h1 className="textCenter">Список дел пользователей</h1>
      {isLoading && <h1> Идёт загрузка</h1>}
      <div>
        <>
          {error && (
            <h1>
              <> Произошла ошибка при загрузке. </>
            </h1>
          )}
        </>
      </div>

      <div className="post">
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoContainer;
