import React, { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PostContainer from "../components/forApiPage/PostContainer";
import PostContainer2 from "../components/forApiPage/PostContainer2";
import TodoContainer from "../components/forApiPage/TodoContainer";

const ApiPage: FC = () => {
  return (
    <div className="mt-6">
      <Container>
        <Row>
          <h1 className="textCenter">ApiPage</h1>
        </Row>

        <Row>
          <Col md={6}>
            <PostContainer />
          </Col>

          <Col md={6}>
            <PostContainer2 />
          </Col>
        </Row>
      </Container>

      <TodoContainer />
    </div>
  );
};

export default ApiPage;
