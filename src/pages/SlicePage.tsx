import React, { FC, useState } from "react";
import UserSliceContainer from "../components/forSlice/UserSliceContainer";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Container } from "react-bootstrap";
import PostSliceContainer from "../components/forSlice/PostSliceContainer";
import CommentSliceContainer from "../components/forSlice/CommentSliceContainer";
import AlbumSliceContainer from "../components/forSlice/AlbumSliceContainer";
import TodoSliceContainer from "../components/forSlice/TodoSliceContainer";

const SlicePage: FC = () => {
  const [posts, setPosts] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [almums, setAlbums] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);

  const handlePosts: () => void = () => {
    setPosts(true);
    setComments(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
  };
  const handleComments: () => void = () => {
    setComments(true);
    setPosts(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
  };
  const handleAlbums: () => void = () => {
    setAlbums(true);
    setComments(false);
    setPosts(false);
    setUsers(false);
    setTodos(false);
  };

  const handleTodos: () => void = () => {
    setTodos(true);
    setAlbums(false);
    setComments(false);
    setPosts(false);
    setUsers(false);
  };

  const handleUsers: () => void = () => {
    setUsers(true);
    setComments(false);
    setPosts(false);
    setAlbums(false);
    setTodos(false);
  };

  return (
    <div className="mt-6">
      <Container className="card">
        <ButtonGroup aria-label="Basic example">
          <Button onClick={handlePosts} variant="outline-primary">
            posts
          </Button>

          <Button onClick={handleComments} variant="outline-primary">
            comments
          </Button>

          <Button onClick={handleAlbums} variant="outline-primary">
            albums
          </Button>

          <Button variant="outline-primary">photos</Button>

          <Button onClick={handleTodos} variant="outline-primary">
            todos
          </Button>

          <Button onClick={handleUsers} variant="outline-primary">
            users
          </Button>
        </ButtonGroup>
      </Container>

      {posts && <PostSliceContainer />}
      {comments && <CommentSliceContainer />}
      {users && <UserSliceContainer />}
      {almums && <AlbumSliceContainer />}
      {todos && <TodoSliceContainer />}
    </div>
  );
};

export default SlicePage;
