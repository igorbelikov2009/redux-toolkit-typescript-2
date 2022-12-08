import React, { FC, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import ButtonsBlock from "../components/ButtonsBlock";
import AlbumApiContainer from "../components/forApiPage/AlbumApiContainer";
import CommentApiContainer from "../components/forApiPage/CommentApiContainer";
import PhotoApiContainer from "../components/forApiPage/PhotoApiContainer";
import PostCombinedContainer from "../components/forApiPage/PostCombinedContainer";
import PostList from "../components/forApiPage/PostPagination";
import ProductApiContainer from "../components/forApiPage/ProductApiContainer";

import TodoContainer from "../components/forApiPage/TodoContainer";
import TodomApiContainer from "../components/forApiPage/TodomApiContainer";
import UserApiContainer from "../components/forApiPage/UserApiContainer";
import { IButton } from "../models/types";

const ApiPage: FC = () => {
  const [startPage, setStartPage] = useState<boolean>(true); // true
  const [postComb, setPostComb] = useState<boolean>(false);
  const [pagination, setPagination] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [albums, setAlbums] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);
  const [photos, setPhotos] = useState<boolean>(false);
  const [products, setProducts] = useState<boolean>(false);
  const [todoms, setTodoms] = useState<boolean>(false);

  const handlersAllFalse: () => void = () => {
    setStartPage(false);
    setComments(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
    setPhotos(false);
    setPostComb(false);
    setProducts(false);
    setTodoms(false);
    setPagination(false);
  };

  const handlePostComb: () => void = () => {
    handlersAllFalse();
    setPostComb((prev) => !prev);
  };
  const handleComments: () => void = () => {
    handlersAllFalse();
    setComments((prev) => !prev);
  };
  const handleAlbums: () => void = () => {
    handlersAllFalse();
    setAlbums((prev) => !prev);
  };
  const handleTodos: () => void = () => {
    handlersAllFalse();
    setTodos((prev) => !prev);
  };
  const handleUsers: () => void = () => {
    handlersAllFalse();
    setUsers((prev) => !prev);
  };
  const handlePhotos: () => void = () => {
    handlersAllFalse();
    setPhotos((prev) => !prev);
  };
  const handleProducts: () => void = () => {
    handlersAllFalse();
    setProducts((prev) => !prev);
  };
  const handleTodoms: () => void = () => {
    handlersAllFalse();
    setTodoms(true);
  };
  const handlePagination: () => void = () => {
    handlersAllFalse();
    setPagination(true);
  };
  const handleTransition: () => void = () => {
    handlersAllFalse();
    setStartPage(true);
  };

  const buttons: IButton[] = [
    { id: 1, handle: handlePostComb, title: "postsComb", active: postComb, variant: "outline-primary" },
    { id: 2, handle: handlePagination, title: "dynamic-pagination", active: pagination, variant: "outline-primary" },
    { id: 3, handle: handleComments, title: "comments", active: comments, variant: "outline-primary" },
    { id: 4, handle: handleAlbums, title: "albums", active: albums, variant: "outline-primary" },
    { id: 5, handle: handlePhotos, title: "photos", active: photos, variant: "outline-primary" },
    { id: 6, handle: handleTodos, title: "todos", active: todos, variant: "outline-primary" },
    { id: 7, handle: handleUsers, title: "users", active: users, variant: "outline-primary" },
    { id: 8, handle: handleProducts, title: "products", active: products, variant: "outline-primary" },
    { id: 9, handle: handleTodoms, title: "todoms", active: todoms, variant: "outline-primary" },
  ];

  return (
    <div className="mt-6">
      <Container className="card">
        <ButtonsBlock buttons={buttons} />

        {startPage && (
          <div className="mt-4">
            <Row>
              <h2 className="textCenter mb-4 ">Используем ApiPage</h2>
            </Row>

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
              <Card>
                <p>
                  Если возникнет ситуация, когда, по какой-то причине, необходимо перезаписать данные, то есть функция
                  <b>
                    <b> refetch()</b>
                  </b>
                  , которую мы можем вызывать на какое-то событие. И в таком, случае, данные будут подгружены заново.
                </p>

                <p>
                  <b> refetch()</b> достаём из списка при деструктуризации автоматически сгенерированного хука
                  useFetchAllPostsQuery().
                </p>

                <pre>
                  <code className="colorGreen fontBold">
                    const &#123; data: posts, error, isLoading, refetch &#125; = postAPI.useFetchAllPostsQuery(limit);
                  </code>
                </pre>

                <p>
                  Работу функции <b> refetch()</b> можем наблюдать в списке постов <b>postsComb</b> и в списке комментов
                  <b> comments</b>
                </p>

                <p>
                  Если нужно производить обновление подгрузки регулярно, автоматически, в определённый промежуток
                  времени, мы можем использовать <b> pollingInterval </b>.
                </p>
                <pre>
                  <code className="colorGreen fontBold">
                    const &#123; data: todos, error, isLoading &#125; = todoAPI.useFetchAllTodosQuery(limit, &#123;
                    pollingInterval: 1000 &#125;);
                  </code>
                </pre>

                <p>
                  <b> pollingInterval </b> - это <i> объект </i>, второй аргумент автоматически сгенерированного хука
                  useFetchAllPostsQuery().
                </p>

                <p>
                  <b> pollingInterval </b>, это когда в определённый промежуток времени у нас отправляется новый запрос,
                  и мы, в данном случае, ежесекундно получаем обновлённые данные. Это можно использовать в чатах,
                  уведомлениях, своего рода - аналог вэбсокетов.
                </p>

                <p>
                  Работу <b> pollingInterval</b> можем наблюдать в списке дел пользователя <b>todos</b>. Смотри в
                  рабочей консоле, в вкладке <b>"Сеть"</b>
                </p>
              </Card>
            </Row>
          </div>
        )}
      </Container>

      {comments && <CommentApiContainer topOfPage={handleTransition} />}
      {postComb && <PostCombinedContainer topOfPage={handleTransition} />}
      {todos && <TodoContainer topOfPage={handleTransition} />}
      {albums && <AlbumApiContainer topOfPage={handleTransition} />}
      {photos && <PhotoApiContainer topOfPage={handleTransition} />}
      {users && <UserApiContainer topOfPage={handleTransition} />}
      {products && <ProductApiContainer topOfPage={handleTransition} />}
      {todoms && <TodomApiContainer topOfPage={handleTransition} />}
      {pagination && <PostList topOfPage={handlePagination} />}
    </div>
  );
};

export default ApiPage;
