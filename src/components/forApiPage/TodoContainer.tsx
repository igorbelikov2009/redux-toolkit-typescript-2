import React from "react";
import { Container, Row } from "react-bootstrap";
import { todoAPI } from "../../services/TodoService";
import TodoItem from "../items/TodoItem";

const TodoContainer = () => {
  // параметр 100 - это мы задаём значение для limit
  const { data: todos, error, isLoading } = todoAPI.useFetchAllTodosQuery(100);

  return (
    <Container className="card">
      <Row>
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
      </Row>
    </Container>
  );
};

export default TodoContainer;
