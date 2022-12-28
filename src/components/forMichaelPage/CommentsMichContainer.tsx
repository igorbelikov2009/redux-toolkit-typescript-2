import React, { FC, useEffect, useState, useMemo } from "react";
import { Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { IComment, IFilter } from "../../models/types";
import { addCommentMich, fetchCommentsMich } from "../../store/michReducer/commentsMichReducer";
import PaginationButtons from "../gui/PaginationButtons";
import RoutesBlock from "../gui/RoutesBlock";
import MySelect, { IOption } from "../gui/select/MySelect";
import FormCreation, { IFormsOfCreation } from "../modal/FormCreation";
import MyModal from "../modal/MyModal";
import SortFilter from "../SortFilter";
import CommentMichItem from "./itemMich/CommentMichItem";

const CommentsMichContainer: FC = () => {
  const history = useHistory();
  const location = history.location.pathname;
  const [postId, setPostId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [limit, setLimit] = useState<number>(25);
  const [page, setPage] = useState<number>(1);

  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispanch();
  const { res, status, error } = useAppSelector((state) => state.commentsMichReducer);
  const comments = res.comments;
  const totalCount = Number(res.totalCount); // общее количество элементов полученных с сервера
  // console.log(totalCount);

  // Вычисляем количество страниц
  const countPage: number = Math.ceil(totalCount / Number(limit));

  // Создаём массив pages[], состоящий из нумерации страниц, типа const pages = [1, 2, 3, 4, 5];
  // Этот массив нужен нам для пагинации
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }
  // console.log(countPage, pages);
  const optionsLimit: IOption[] = [
    { value: "25", name: 25 },
    { value: "50", name: 50 },
    { value: "100", name: 100 },
  ];

  // форма создания нового объекта
  const formsOfCreation: IFormsOfCreation[] = [
    {
      type: "text",
      value: postId,
      setValue: setPostId,
      placeholder: "Введите номер поста",
    },
    {
      type: "text",
      value: email,
      setValue: setEmail,
      placeholder: "Введите email пользователя",
    },
    {
      type: "text",
      value: name,
      setValue: setName,
      placeholder: "Введите название комментария",
    },
    {
      type: "text",
      value: body,
      setValue: setBody,
      placeholder: "Введите содержимое комментария",
    },
  ];

  const comment: IComment = {
    postId: Number(postId),
    id: 0,
    name: name,
    email: email,
    body: body,
  };

  const handleAddComment = () => {
    if (comment.postId && comment.name && comment.email && comment.body) {
      dispatch(addCommentMich(comment));
      setPostId("");
      setEmail("");
      setName("");
      setBody("");
      setModal(false);
    }
  };

  // Сортировка и поиск
  const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });
  const optionsComments: IOption[] = [
    { value: "postId", name: "по номеру поста" },
    { value: "id", name: "по номеру комментария" },
    { value: "email", name: "по email пользователя" },
    { value: "name", name: "по заглавию комментария" },
    { value: "body", name: "по содержимому комментария" },
  ];
  // Получаем отсортированный массив.
  const sortedComments = useMemo(() => {
    if (filter.sort && comments) {
      return [...comments].sort((a, b) => (a[filter.sort] > b[filter.sort] ? 1 : -1));
    }
    return comments;
  }, [comments, filter.sort]);
  // Отсортированный и отфильтрованный массив:
  const sortedAndSearchedComments = useMemo(() => {
    if (sortedComments) {
      return sortedComments.filter((comment) => comment.name?.toLowerCase().includes(filter.query));
    }
  }, [sortedComments, filter.query]);
  // Сортировка и поиск

  useEffect(() => {
    dispatch(fetchCommentsMich({ limit, page }));
    // console.log(page);
  }, [dispatch, limit, page]);

  return (
    <div>
      <div className="routeBar">
        <RoutesBlock location={location} />
      </div>

      <div className="rightBlock">
        <div className="card mt-5">
          <Row>
            <div className="mb-4">
              <MySelect
                titleSelect="Выберите количество комментов на странице"
                defaultValue="Количество комментов на странице"
                disabled={true}
                value={limit}
                onChangeValue={setLimit}
                options={optionsLimit}
              />
            </div>

            <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

            <h2 className="textCenter mb-4">Список постов пользователей из commentsMichReducer</h2>
            <h6>
              Логика сортировки и поиска находится в компоненте. Я не смог воспользоваться созданным хуком
              "useSortedAndSearchedArray" по причине неуниверсальности типов. В созданном хуке мы ищем по полю объекта
              "title", а здесь отсутствует такое поле, здесь поле "name".
            </h6>

            <SortFilter
              filter={filter}
              setFilter={setFilter}
              options={optionsComments}
              placeholder="Поиск по заглавию коммента"
            />

            <div>
              {status === "loading" && <h1 className="textCenter">Идёт загрузка</h1>}

              <div>{error && <h1 className="textCenter"> {error} </h1>}</div>
            </div>

            <div className="containerButton mt-2 mb-4">
              <Button variant="outline-success" onClick={() => setModal(true)}>
                Создать новый пост
              </Button>
            </div>

            <TransitionGroup>
              {sortedAndSearchedComments &&
                sortedAndSearchedComments.map((comment) => (
                  <CSSTransition key={comment.id} timeout={500} classNames="comment">
                    <CommentMichItem comment={comment} />
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </Row>

          <MyModal visible={modal} setVisible={setModal}>
            <FormCreation
              formsOfCreation={formsOfCreation}
              addObject={handleAddComment}
              ButtonName="Добавить новый пост"
            />
          </MyModal>
        </div>
      </div>
    </div>
  );
};

export default CommentsMichContainer;
