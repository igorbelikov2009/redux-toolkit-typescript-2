import React, { FC } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PostContainer2 from "./PostContainer2";
import PostContainer3 from "./PostContainer3";

const PostCombinedContainer: FC = () => {
  return (
    <Container className="card">
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
