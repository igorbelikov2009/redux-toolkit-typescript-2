import React, { FC, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import ButtonsBlock from "../components/ButtonsBlock";
import AlbumApiContainer from "../components/forApiPage/AlbumApiContainer";
import CommentApiContainer from "../components/forApiPage/CommentApiContainer";
import PhotoApiContainer from "../components/forApiPage/PhotoApiContainer";
import PostCombinedContainer from "../components/forApiPage/PostCombinedContainer";

import TodoContainer from "../components/forApiPage/TodoContainer";

const ApiPage: FC = () => {
  const [startPage, setStartPage] = useState<boolean>(true);
  const [postCombined, setPostCombined] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [albums, setAlbums] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);
  const [photos, setPhotos] = useState<boolean>(false);
  const [products, setProducts] = useState<boolean>(false);

  const handlersAllFalse: () => void = () => {
    setStartPage(false);
    setComments(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
    setPhotos(false);
    setPostCombined(false);
    setProducts(false);
  };

  const handlePostsCombined: () => void = () => {
    handlersAllFalse();
    setPostCombined(true);
  };
  const handleComments: () => void = () => {
    handlersAllFalse();
    setComments(true);
  };
  const handleAlbums: () => void = () => {
    handlersAllFalse();
    setAlbums(true);
  };
  const handleTodos: () => void = () => {
    handlersAllFalse();
    setTodos(true);
  };
  const handleUsers: () => void = () => {
    handlersAllFalse();
    setUsers(true);
  };
  const handlePhotos: () => void = () => {
    handlersAllFalse();
    setPhotos(true);
  };
  const handleProducts: () => void = () => {
    handlersAllFalse();
    setProducts(true);
  };

  interface IButton {
    id: number;
    handle: () => void;
    title: string;
  }

  const buttons: IButton[] = [
    { id: 1, handle: handlePostsCombined, title: "postsCombined" },
    { id: 2, handle: handleComments, title: "comments" },
    { id: 3, handle: handleAlbums, title: "albums" },
    { id: 4, handle: handlePhotos, title: "photos" },
    { id: 5, handle: handleTodos, title: "todos" },
    { id: 6, handle: handleUsers, title: "users" },
    { id: 7, handle: handleProducts, title: "products" },
  ];

  return (
    <div className="mt-6">
      <Container className="card">
        {startPage && (
          <div>
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
                  Работу функции <b> refetch()</b> можем наблюдать в списке постов <b>postsCombined</b> и в списке
                  комментов
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

        <ButtonsBlock buttons={buttons} />
      </Container>

      {comments && <CommentApiContainer />}
      {postCombined && <PostCombinedContainer />}
      {todos && <TodoContainer />}
      {albums && <AlbumApiContainer />}
      {photos && <PhotoApiContainer />}
    </div>
  );
};

export default ApiPage;
