import React, { FC, useState } from "react";
import { Container, Row, Button, Card } from "react-bootstrap";
import { IComment } from "../../models/types";
import { commentAPI } from "../../services/CommentService";
import CommentItem from "../items/CommentItem";

const CommentApiContainer: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(100);

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ FetchAllComment
  const { data: comments, error, isLoading, refetch } = commentAPI.useFetchAllCommentsQuery(limit);
  // Функцию refetch достаём из списка при деструктуризации. Она нам нужна только в том
  // случае, когда нам необходимо, по какой-то причине, перезаписать данные, обновить.
  // И в таком, случае, данные будут подгружены заново. Если refetch  нам не нужна, мы
  // не достаём её из списка при деструктуризации.

  // Поскольку, мы уже описали эндпоинт в CommentService - createComment, с помощью которого
  // будем comment создавать, для нас был сгенерирован автоматически
  // хук useCreateCommentMutation(), по названию того эндпоинта, который мы создавали.
  // Этим хуком мы можем воспользоваться. В опциях () мы можем указывать селектор и получать
  // какие-то определённые данные, то есть отфильтрованные по какому-то условию.
  // Данный хук возвращает нам не объект с какими-то данными, а массив, где первый
  // элемент - это функция, которую мы можем вызвать для того, чтобы произошла
  // мутация. А второй - это объект, в котором находятся поля: isLoading, data, error и тд,
  // которые мы, при необходимости, можем обрабатывать.
  // И при загрузке данных и при создании поста, поле ошибки называется error, а
  // поле индикации загрузки - isLoading. Чтобы не было путаницы, мы прямо здесь,
  // через двоеточие, меняем название.
  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ createComment
  const [createComment, { error: createError, isLoading: createIsLoading }] = commentAPI.useCreateCommentMutation();

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ updateComment
  const [updateComment, { isLoading: updateIsLoading }] = commentAPI.useUpdateCommentMutation();

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ deleteComment
  const [deleteComment, { error: deleteError }] = commentAPI.useDeleteCommentMutation();

  // Аргументом в асинхронную функцию createComment() нам надо передать объект типа IComment
  // и поскольку ID у нас будет генерировать сервер, явно укажем, что объект as IComment
  const handleCreate = async () => {
    const postId = prompt("Введите номер комментируемого вами поста");
    const email = prompt("Введите свой email");
    const name = prompt("Введите название комментария");
    const body = prompt("Введите текст комментария");
    await createComment({ postId: postId, email: email, name: name, body: body } as unknown as IComment);
  };

  const handleUpdate = (comment: IComment) => {
    updateComment(comment);
  };

  const handleRemove = (comment: IComment) => {
    deleteComment(comment);
  };

  return (
    <Container className="card">
      <div className="containerButton mb-4">
        <Button onClick={() => refetch()} variant="outline-success">
          REFETCH
        </Button>
      </div>

      <Row>
        <Card className="mb-4">
          <h6>
            Работу функции refetch() наблюдаем в рабочей консоле, в вкладке "Сеть". Счётчик запросов (Запросы: 37)
            увеличивается с каждым кликом по кнопке.
          </h6>
        </Card>
      </Row>

      <Row>
        <div>
          <h3 className="textCenter">Список комментов от пользователей из commentAPI</h3>

          <div className="containerButton">
            <Button variant="outline-success" onClick={handleCreate}>
              Добавить новый комментарий
            </Button>
          </div>

          <div>
            {isLoading && <h1>Идёт загрузка</h1>}
            {createIsLoading && <h1>Идёт создание комментария</h1>}
            {updateIsLoading && <h1>Идёт обновление комментария</h1>}
          </div>

          <div>
            <>
              {error && (
                <h1>
                  <> Произошла ошибка при загрузке. </>
                </h1>
              )}
            </>

            <>
              {deleteError && (
                <h1>
                  <> Произошла ошибка при удалении. </>
                </h1>
              )}
            </>

            <>
              {createError && (
                <h1>
                  <> Произошла ошибка при создании нового комментария. </>
                </h1>
              )}
            </>
          </div>

          {/* Добавляем проверку: если у нас есть комментарии, и они не undefined  */}
          <div className="post">
            {comments &&
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} update={handleUpdate} remove={handleRemove} />
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default CommentApiContainer;
