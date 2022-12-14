import React, { FC, useState } from "react";
import UserAsyncSliceContainer from "../components/forAsuncThunc/UserAsyncSliceContainer";
import { Container, Row } from "react-bootstrap";
import PostAsyncSliceContainer from "../components/forAsuncThunc/PostAsyncSliceContainer";
import CommentAsyncSliceContainer from "../components/forAsuncThunc/CommentAsyncSliceContainer";
import AlbumAsyncSliceContainer from "../components/forAsuncThunc/AlbumAsyncSliceContainer";
import TodoAsyncSliceContainer from "../components/forAsuncThunc/TodoAsyncSliceContainer";
import PhotoAsyncSliceContainer from "../components/forAsuncThunc/PhotoAsyncSliceContainer";
import { IButton } from "../models/types";
import ButtonsBlock from "../components/ButtonsBlock";
import TodoSeparAsyncSliceContainer from "../components/forAsuncThunc/TodoSeparAsyncSliceContainer";

const AsyncThunkPage: FC = () => {
  const [startPage, setStartPage] = useState<boolean>(true); // true
  const [posts, setPosts] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [almums, setAlbums] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);
  const [todosSepar, setTodosSepar] = useState<boolean>(false);
  const [photos, setPhotos] = useState<boolean>(false);

  const handlersAllFalse: () => void = () => {
    setStartPage(false);
    setPosts(false);
    setComments(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
    setTodosSepar(false);
    setPhotos(false);
  };

  const handlePosts: () => void = () => {
    handlersAllFalse();
    setPosts((prev) => !prev);
  };
  const handleComments: () => void = () => {
    handlersAllFalse();
    setComments((prev) => !prev);
  };
  const handleAlbums: () => void = () => {
    handlersAllFalse();
    setAlbums((prev) => !prev);
  };

  const handleTodos: () => void = () => {
    handlersAllFalse();
    setTodos((prev) => !prev);
  };
  const handleTodosSepar: () => void = () => {
    handlersAllFalse();
    setTodosSepar((prev) => !prev);
  };

  const handleUsers: () => void = () => {
    handlersAllFalse();
    setUsers((prev) => !prev);
  };

  const handlePhotos: () => void = () => {
    handlersAllFalse();
    setPhotos((prev) => !prev);
  };

  const handleTransition: () => void = () => {
    handlersAllFalse();
    setStartPage(true);
  };

  const buttons: IButton[] = [
    { id: 0, handle: handlePosts, title: "posts", active: posts, variant: "outline-primary" },
    { id: 1, handle: handleComments, title: "comments", active: comments, variant: "outline-primary" },
    { id: 2, handle: handleAlbums, title: "albums", active: almums, variant: "outline-primary" },
    { id: 3, handle: handlePhotos, title: "photos", active: photos, variant: "outline-primary" },
    { id: 4, handle: handleTodos, title: "todos", active: todos, variant: "outline-primary" },
    { id: 5, handle: handleTodosSepar, title: "todosSepar", active: todosSepar, variant: "outline-primary" },
    { id: 6, handle: handleUsers, title: "users", active: users, variant: "outline-primary" },
    { id: 7, handle: handleTransition, title: "???? ????????", active: startPage, variant: "outline-dark" },
  ];
  return (
    <div className="mt-6">
      <Container className="card">
        <Row>
          <h2 className="textCenter mb-4"> ???????????????????? createSlice() ?? createAsyncThunk() </h2>
        </Row>

        <Row>
          <h4 className="textCenter mb-4">
            ???????????????????? ????????
            <a className="link ml-1" href="https://jsonplaceholder.typicode.com/" target={"_blank"} rel="noreferrer">
              JSON Placeholder
            </a>
          </h4>
        </Row>

        <ButtonsBlock buttons={buttons} />
      </Container>

      {posts && <PostAsyncSliceContainer />}
      {comments && <CommentAsyncSliceContainer />}
      {almums && <AlbumAsyncSliceContainer />}
      {users && <UserAsyncSliceContainer />}
      {todos && <TodoAsyncSliceContainer />}
      {todosSepar && <TodoSeparAsyncSliceContainer />}
      {photos && <PhotoAsyncSliceContainer />}
    </div>
  );
};

export default AsyncThunkPage;
