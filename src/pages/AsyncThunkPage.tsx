import React, { FC, useState } from "react";
import UserAsyncSliceContainer from "../components/forAsuncThunc/UserAsyncSliceContainer";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Container, Row } from "react-bootstrap";
import PostAsyncSliceContainer from "../components/forAsuncThunc/PostAsyncSliceContainer";
import CommentAsyncSliceContainer from "../components/forAsuncThunc/CommentAsyncSliceContainer";
import AlbumAsyncSliceContainer from "../components/forAsuncThunc/AlbumAsyncSliceContainer";
import TodoAsyncSliceContainer from "../components/forAsuncThunc/TodoAsyncSliceContainer";
import PhotoAsyncSliceContainer from "../components/forAsuncThunc/PhotoAsyncSliceContainer";

const AsyncThunkPage: FC = () => {
  const [posts, setPosts] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [almums, setAlbums] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);
  const [photos, setPhotos] = useState<boolean>(false);

  const handlersAllFalse: () => void = () => {
    setPosts(false);
    setComments(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
    setPhotos(false);
  };

  const handlePosts: () => void = () => {
    handlersAllFalse();
    setPosts(true);
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

  interface IButton {
    id: number;
    handle: () => void;
    title: string;
  }

  const buttons: IButton[] = [
    { id: 0, handle: handlePosts, title: "posts" },
    { id: 1, handle: handleComments, title: "comments" },
    { id: 2, handle: handleAlbums, title: "albums" },
    { id: 3, handle: handlePhotos, title: "photos" },
    { id: 4, handle: handleTodos, title: "todos" },
    { id: 5, handle: handleUsers, title: "users" },
  ];
  return (
    <div className="mt-6">
      <Container className="card">
        <Row>
          <h2 className="textCenter mb-4"> Используем createSlice() и createAsyncThunk() </h2>
        </Row>
        <ButtonGroup aria-label="Basic example">
          {buttons.map((button) => (
            <Button key={button.id} onClick={button.handle} variant="outline-primary">
              {button.title}
            </Button>
          ))}
        </ButtonGroup>
      </Container>

      {posts && <PostAsyncSliceContainer />}
      {comments && <CommentAsyncSliceContainer />}
      {almums && <AlbumAsyncSliceContainer />}
      {users && <UserAsyncSliceContainer />}
      {todos && <TodoAsyncSliceContainer />}
      {photos && <PhotoAsyncSliceContainer />}
    </div>
  );
};

export default AsyncThunkPage;
