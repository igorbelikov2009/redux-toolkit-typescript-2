import React, { FC } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PostContainer2 from "./PostContainer2";
import PostContainer3 from "./PostContainer3";

interface PostCombinedContainerProps {
  topOfPage: () => void;
}

const PostCombinedContainer: FC<PostCombinedContainerProps> = ({ topOfPage }) => {
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
        <Card>
          <p>
            {" "}
            Подгружаем 2 разных списка, с разным лимитом, по одному запросу. Таким образом происходит кэширование
            данных. Это бывает крайне полезно, когда у нас есть, например, выпадающие списки с данными, которые
            подгружаются асинхронно. Эти списки используются в приложении и например, повсеместно, и чтобы получить
            данные для этих списков, нам достаточно использовать хуки и быть уверенными в том, что у нас не будет лишних
            запросов.
          </p>
          <p>
            {" "}
            Но, если возникнет ситуация, когда данные по какой-то причине необходимо перезаписать, то есть функция
            refetch, которую мы можем вызывать на какое-то событие. И в таком, случае, данные будут подгружены заново.
          </p>
          <p>
            {" "}
            refetch достаём из списка при деструктуризации автоматически сгенерированного хука useFetchAllPostsQuery() .
          </p>
          <p>
            {" "}
            pollingInterval - объект, второй аргумент автоматически сгенерированного хука useFetchAllPostsQuery().
            pollingInterval, это когда в определённый промежуток времени у нас отправляется новый запрос, и мы, в данном
            случае, ежесекундно получаем обновлённые данные. Это можно использовать в чатах, уведомлениях, своего рода -
            аналог вэбсокетов. Смотри в списке дел: <b> todos</b>.
          </p>
        </Card>
      </Row>

      <Row>
        <Col md={6}>
          <PostContainer2 />
        </Col>
        <Col md={6}>
          <PostContainer3 />
        </Col>
      </Row>
    </Container>
  );
};

export default PostCombinedContainer;
