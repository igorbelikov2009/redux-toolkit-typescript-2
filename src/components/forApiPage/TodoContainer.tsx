import React, { FC, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { todoAPI } from "../../services/TodoService";
import TodoItem from "../items/TodoItem";
import { Button } from "react-bootstrap";
import { ITodo } from "../../models/types";

interface TodoContainerProps {
  topOfPage: () => void;
}

const TodoContainer: FC<TodoContainerProps> = ({ topOfPage }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(100);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
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
  const { data: todos, error, isLoading } = todoAPI.useFetchAllTodosQuery(page, { pollingInterval: 1000 });
  const [createTodo, { error: createError }] = todoAPI.useCreateTodoMutation();
  const [updateTodo, { error: updateError }] = todoAPI.useUpdateTodoMutation();
  const [deleteTodo, { error: deleteError }] = todoAPI.useDeleteTodoMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название дела") || "";
    const completed = false;

    await createTodo({ title, completed } as ITodo);
  };

  const handleUpdate = (todo: ITodo) => {
    updateTodo(todo);
  };
  const handleRemove = (todo: ITodo) => {
    deleteTodo(todo);
  };
  const handleTransition = () => {
    topOfPage();
  };

  return (
    <Container className="card">
      <div className="containerButton">
        <Button variant="outline-info mr-4 mb-4" onClick={handleTransition}>
          В начало страницы services createApi()
        </Button>

        <Button variant="outline-success mb-4" onClick={handleCreate}>
          Добавить новое дело
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
              {createError && (
                <h1>
                  <> Произошла ошибка при создании. </>
                </h1>
              )}
              {deleteError && (
                <h1>
                  <> Произошла ошибка при удалении. </>
                </h1>
              )}
              {updateError && (
                <h1>
                  <> Произошла ошибка при обновлении. </>
                </h1>
              )}
            </>
          </div>

          <div className="post">
            {todos?.map((todo) => (
              <TodoItem key={todo.id} todo={todo} remove={handleRemove} update={handleUpdate} />
            ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default TodoContainer;
