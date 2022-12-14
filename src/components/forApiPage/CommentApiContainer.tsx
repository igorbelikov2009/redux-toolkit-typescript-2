import React, { FC, useState, useMemo } from "react";
import { Container, Row, Button, Card, Form } from "react-bootstrap";
import { IComment } from "../../models/types";
import { commentAPI } from "../../services/CommentService";
import InputSearch from "../gui/input/InputSearch";

// import MyInput from "../gui/input/MyInput";
import MySelect, { IOption } from "../gui/select/MySelect";
import CommentItem from "../items/CommentItem";

interface CommentApiContainerProps {
  topOfPage: () => void;
}

const CommentApiContainer: FC<CommentApiContainerProps> = ({ topOfPage }) => {
  const [limit, setLimit] = useState<number | string>(100);

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
    const postId = Number(prompt("Введите номер комментируемого вами поста"));
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

  const handleTransition = () => {
    topOfPage();
  };

  //==============================
  // Сортировка, поиск
  const opions: IOption[] = [
    { value: "id", name: "По номеру комментария" },
    { value: "postId", name: "По номеру комментируего поста" },
    { value: "email", name: "По email пользователя" },
    { value: "name", name: "По названию комментария" },
    { value: "body", name: "По тексту комментария" },
  ];

  const [selectedSort, setSelectedSort] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // получаем отсортированный массив комментов
  const sortedComments = useMemo(() => {
    if (selectedSort && comments) {
      return [...comments].sort((a, b) => (a[selectedSort] > b[selectedSort] ? 1 : -1));
    }
    return comments;
  }, [selectedSort, comments]);

  // Отсортированный и отфильтрованный массив:
  const sortedAndSearchedComments = useMemo(() => {
    if (sortedComments) {
      return sortedComments.filter((comment) => comment.name?.toLowerCase().includes(searchQuery));
    }
  }, [searchQuery, sortedComments]);

  const sortComments = (sort: any) => {
    setSelectedSort(sort);
    // console.log(sort);
    // для MySelect, onChangeValue={sortComments}
  };
  // Сортировка, поиск
  //==============================

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value);
  };

  return (
    <Container className="card">
      <Row>
        <Card className="mb-4">
          <Button variant="outline-info mb-4" onClick={handleTransition}>
            В начало страницы services createApi()
          </Button>
          <h6>
            Работу функции refetch() наблюдаем в рабочей консоле, в вкладке "Сеть". Счётчик запросов (Запросы: 37)
            увеличивается с каждым кликом по кнопке.
          </h6>
          <Button onClick={() => refetch()} variant="outline-success">
            REFETCH
          </Button>
        </Card>
      </Row>

      <Row>
        <div>
          <h3 className="textCenter">Список комментов от пользователей из commentAPI</h3>

          <div className="containerButton">
            <Form className="card ml-2">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <h6 className="mb-4">Сколько комментов показать на странице?</h6>

                <Form.Select value={limit} onChange={handleSelect} aria-label="Default select example">
                  <option value="">Все</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </Form.Select>
              </Form.Group>

              <Button variant="outline-success" onClick={handleCreate}>
                Добавить новый комментарий
              </Button>
            </Form>

            <div className="card ml-2">
              <h6> Компоненты поиска и выбора алгоритма сортировки раздельны друг от друга...</h6>
              <div className="mb-3">
                <InputSearch
                  placeholder="Поиск по названию комментария"
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>

              <MySelect
                defaultValue="Сортировка"
                disabled={true}
                options={opions}
                value={selectedSort}
                onChangeValue={sortComments}
              />
            </div>
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
            {sortedAndSearchedComments &&
              sortedAndSearchedComments.map((comment: IComment) => (
                <CommentItem key={comment.id} comment={comment} update={handleUpdate} remove={handleRemove} />
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default CommentApiContainer;
