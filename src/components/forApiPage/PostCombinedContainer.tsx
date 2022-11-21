import React, { FC } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PostContainer2 from "./PostContainer2";
import PostContainer3 from "./PostContainer3";

const PostCombinedContainer: FC = () => {
  return (
    <Container className="card">
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
        <Card className="mb-4">
          <h3 className="textCenter">Подымаем сервер этого приложения на порту 5000 командой </h3>
          <h4 className="textCenter">
            в терминале
            <i className=" colorRed"> json-server --watch db.json --port 5000</i>
          </h4>
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
