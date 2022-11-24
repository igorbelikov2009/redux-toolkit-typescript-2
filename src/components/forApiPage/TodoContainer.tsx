import React, { FC, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { todoAPI } from "../../services/TodoService";
import TodoItem from "../items/TodoItem";
import { Button } from "react-bootstrap";

interface TodoContainerProps {
  topOfPage: () => void;
}

const TodoContainer: FC<TodoContainerProps> = ({ topOfPage }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(100);
  // параметр 100 - это мы задаём значение для limit

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ FetchAllTodos
  // const { data: todos, error, isLoading } = todoAPI.useFetchAllTodosQuery(limit);

  // Функцию refetch достаём из списка при деструктуризации. Она нам нужна только в том
  // случае, когда нам необходимо, по какой-то причине, перезаписать данные, обновить.
  // И в таком, случае, данные будут подгружены заново. Если refetch  нам не нужна, мы
  // не достаём её из списка при деструктуризации. (В данный момент не нужна.)
  // const { data: todos, error, isLoading, refetch } = todoAPI.useFetchAllTodosQuery(limit);

  // Если нужно производить обновление подгрузки автоматически, в определённый промежуток
  // времени, мы можем использовать pollingInterval. pollingInterval - объект, второй аргумент
  // автоматически сгенерированного хука useFetchAllPostsQuery(). pollingInterval, это когда в
  // определённый промежуток времени у нас отправляется новый запрос, и мы, в данном случае,
  // ежесекундно получаем обновлённые данные. Это можно использовать в чатах, уведомлениях,
  // своего рода - аналог вэбсокетов.
  const { data: todos, error, isLoading } = todoAPI.useFetchAllTodosQuery(limit, { pollingInterval: 1000 });

  const handleTransition = () => {
    topOfPage();
  };

  return (
    <Container className="card">
      <div className="containerButton">
        <Button variant="outline-info mr-4 mb-4" onClick={handleTransition}>
          В начало страницы services createApi()
        </Button>
      </div>
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
