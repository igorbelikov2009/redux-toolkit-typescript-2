import React, { FC, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { todoAPI } from "../../services/TodoService";
import TodoItem from "../items/TodoItem";
import { Button } from "react-bootstrap";
import { ITodo } from "../../models/types";
import PaginationButtons from "../gui/PaginationButtons";

interface TodoContainerProps {
  topOfPage: () => void;
}

const TodoContainer: FC<TodoContainerProps> = ({ topOfPage }) => {
  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ FetchAllTodos
  // const { data: todos, error, isLoading } = todoAPI.useFetchAllTodosQuery(page);

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
  // const { data: todos, error, isLoading } = todoAPI.useGetTodoPageByPageQuery(page, { pollingInterval: 1000 });
  //=================================================================================================
  // Для пагинации нам необходимо получить общее количество постов. По этому мы
  // получаем все посты, но не выводим их, просто вычисляем totalCount.
  const { data: totalCountElem } = todoAPI.useGetAllTodosQuery();
  let totalCount: number = 0;

  if (totalCountElem) {
    totalCount = totalCountElem.length;
  }
  // Получаем данные по параметрам, установленным в postPaginationAPI в эндпоинте:
  //  getPostsPagination: query: (page: number = 1, limit: number = 10)

  const [page, setPage] = useState<number>(1);
  // Здесь, limit у нас взят так же из параметров, для расчётов. Здесь мы его не можем
  // менять. В дальнейшем, limit надо будет получать из параметра запроса.
  const [limit] = useState<number>(10);
  // Вычисляем количество страниц
  let countPage: number = Math.ceil(totalCount / limit);
  // Создаём массив pages[], состоящий из нумерации страниц, типа const pages = [1, 2, 3, 4, 5];
  // Этот массив нужен нам для пагинации
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }

  // Получаем список дел постранично.
  const { data: todos, error, isLoading } = todoAPI.useGetTodoPageByPageQuery(page);

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

          <PaginationButtons page={page} pages={pages} countPage={countPage} setPage={setPage} />
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
