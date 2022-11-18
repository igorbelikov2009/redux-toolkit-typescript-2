import React, { FC, useState } from "react";
import UserSliceContainer from "../components/forSlice/UserSliceContainer";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Container } from "react-bootstrap";
import PostSliceContainer from "../components/forSlice/PostSliceContainer";

const SlicePage: FC = () => {
  const [users, setUsers] = useState<boolean>(false);
  const [posts, setPosts] = useState<boolean>(false);

  const handlePosts = () => {
    setPosts(true);
    setUsers(false);
  };
  const handleUsers = () => {
    setUsers(true);
    setPosts(false);
  };

  return (
    <div className="mt-6">
      <Container className="card">
        <ButtonGroup aria-label="Basic example">
          <Button onClick={handlePosts} variant="outline-primary">
            posts
          </Button>
          <Button variant="outline-primary">comments</Button>
          <Button variant="outline-primary">albums</Button>
          <Button variant="outline-primary">photos</Button>
          <Button variant="outline-primary">todos</Button>

          <Button onClick={handleUsers} variant="outline-primary">
            users
          </Button>
        </ButtonGroup>
      </Container>

      {users && <UserSliceContainer />}
      {posts && <PostSliceContainer />}
    </div>
  );
};

export default SlicePage;
