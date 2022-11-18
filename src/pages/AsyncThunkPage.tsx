import React, { FC, useState } from "react";
import UserAsyncSliceContainer from "../components/forAsuncThunc/UserAsyncSliceContainer";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Container } from "react-bootstrap";
import PostAsyncSliceContainer from "../components/forAsuncThunc/PostAsyncSliceContainer";

const AsyncThunkPage: FC = () => {
  const [users, setUsers] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [posts, setPosts] = useState<boolean>(false);

  const handlePosts: () => void = () => {
    setPosts(true);
    setUsers(false);
  };
  const handleUsers: () => void = () => {
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

      {posts && <PostAsyncSliceContainer />}
      {users && <UserAsyncSliceContainer />}
    </div>
  );
};

export default AsyncThunkPage;
