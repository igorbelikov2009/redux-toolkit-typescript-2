import React, { FC, useEffect, useState, useMemo } from "react";
import { Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { IFilter, IPost } from "../../models/types";
// import { MICHAEL_POSTS_ROUTE } from "../../routes";
import { addPostMich, fetchPostsMich } from "../../store/michReducer/postMichReducer";
import RoutesBlock from "../gui/RoutesBlock";
import { IOption } from "../gui/select/MySelect";
import FormCreation, { IFormsOfCreation } from "../modal/FormCreation";
import MyModal from "../modal/MyModal";
import SortFilter from "../SortFilter";
import PostMichItem from "./itemMich/PostMichItem";

const PostMichContainer: FC = () => {
  const history = useHistory();
  const location = history.location.pathname;

  // title, body, userId для создания нового объекта (post)
  // и формы создания нового объекта (post) formsOfCreation
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const dispatch = useAppDispanch();
  const { posts, status, error } = useAppSelector((state) => state.postMichReducer);
  // console.log(posts, status, error);

  // форма создания нового объекта
  const formsOfCreation: IFormsOfCreation[] = [
    {
      type: "text",
      value: userId,
      setValue: setUserId,
      placeholder: "Введите № пользователя",
    },
    {
      type: "text",
      value: title,
      setValue: setTitle,
      placeholder: "Введите название нового поста",
    },
    {
      type: "text",
      value: body,
      setValue: setBody,
      placeholder: "Введите текст нового поста",
    },
  ];

  // создаём новый объект (post), как аргумент:
  //  для dispatch(addPostMich(post)) на этой странице. Строка 59.
  //  для addPostMich в PostMichReducer. Строка 88
  const post: IPost = {
    userId: Number(userId), // берём из созданного нами состояния
    id: 0, // назначаем 0, потом ему автоматически присвоится значение
    // на один больше последнего id
    title: title, // берём из созданного нами состояния
    body: body, // берём из созданного нами состояния
  };

  const handleAddPost = () => {
    if (post.userId && post.title && post.body) {
      dispatch(addPostMich(post));
      setUserId("");
      setTitle("");
      setBody("");
      setModal(false);
    }
  };

  // Сортировка и поиск
  const [filter, setFilter] = useState<IFilter>({ query: "", sort: "" });
  const optionsSort: IOption[] = [
    { value: "userId", name: "по номеру пользователя" },
    { value: "id", name: "по номеру поста" },
    { value: "title", name: "по названию поста" },
    { value: "body", name: "по содержимому поста" },
  ];

  // Получаем отсортированный массив.
  const sortedPosts = useMemo(() => {
    if (filter.sort && posts) {
      return [...posts].sort((a, b) => (a[filter.sort] > b[filter.sort] ? 1 : -1));
    }
    return posts;
  }, [posts, filter.sort]);

  // Отсортированный и отфильтрованный массив:
  const sortedAndSearchedPosts = useMemo(() => {
    if (sortedPosts) {
      return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query));
    }
  }, [sortedPosts, filter.query]);
  // Сортировка и поиск

  useEffect(() => {
    dispatch(fetchPostsMich());
  }, [dispatch]);

  return (
    <div>
      <div className="routeBar">
        <RoutesBlock location={location} />
      </div>

      <div className="rightBlock">
        <div className="card mt-5">
          <div className="containerButton mt-2 mb-4">
            <Button variant="outline-success" onClick={() => setModal(true)}>
              Создать новый пост
            </Button>
          </div>

          <Row>
            <h2 className="textCenter mb-4">Список постов пользователей из postMichReducer</h2>
            <h6>
              Логика сортировки и поиска находится в компоненте, не вынесена в отдельный хук. Пагинацию не стал делать
              здесь: пусть редюсер и получение данных из редюсера будут без пагинации.
            </h6>
            <SortFilter
              filter={filter}
              setFilter={setFilter}
              placeholder="Поиск по заглавию поста"
              options={optionsSort}
            />

            <div>
              {status === "loading" && <h1 className="textCenter">Идёт загрузка</h1>}

              <div>{error && <h1 className="textCenter"> {error} </h1>}</div>
            </div>

            {sortedAndSearchedPosts && sortedAndSearchedPosts.map((post) => <PostMichItem post={post} key={post.id} />)}
          </Row>

          <MyModal visible={modal} setVisible={setModal}>
            <FormCreation
              formsOfCreation={formsOfCreation}
              addObject={handleAddPost}
              ButtonName="Добавить новый пост"
            />
          </MyModal>
        </div>
      </div>
    </div>
  );
};

export default PostMichContainer;
