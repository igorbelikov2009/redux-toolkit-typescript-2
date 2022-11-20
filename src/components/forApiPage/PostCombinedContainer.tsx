import React, { FC } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PostContainer2 from "./PostContainer2";
import PostContainer3 from "./PostContainer3";

const PostCombinedContainer: FC = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <PostContainer2 />
        </Col>
        <Col md={6}>
          <PostContainer3 />{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default PostCombinedContainer;
