import React, { FC } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { todoAPI } from "../../services/TodoService";
import TodoItem from "../items/TodoItem";

const TodoContainer: FC = () => {
  // параметр 100 - это мы задаём значение для limit
  const { data: todos, error, isLoading } = todoAPI.useFetchAllTodosQuery(100);

  return (
    <Container className="card">
      <Row>
        <Card className="mb-4">
          <h3 className="textCenter">Подымаем сервер этого приложения на порту 5000 командой </h3>
          <h4 className="textCenter">
            в терминале
            <i className=" colorRed"> json-server --watch db.json --port 5000</i>
          </h4>
        </Card>
      </Row>

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
