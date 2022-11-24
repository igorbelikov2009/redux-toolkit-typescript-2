import React, { FC, useState } from "react";
import UserSliceContainer from "../components/forSlice/UserSliceContainer";
import { Container, Row } from "react-bootstrap";
import PostSliceContainer from "../components/forSlice/PostSliceContainer";
import CommentSliceContainer from "../components/forSlice/CommentSliceContainer";
import AlbumSliceContainer from "../components/forSlice/AlbumSliceContainer";
import TodoSliceContainer from "../components/forSlice/TodoSliceContainer";
import PhotoSliceContainer from "../components/forSlice/PhotoSliceContainer";
import ButtonsBlock from "../components/ButtonsBlock";
import { IButton } from "../models/types";

const SlicePage: FC = () => {
  const [startPage, setStartPage] = useState<boolean>(true); // true
  const [posts, setPosts] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [albums, setAlbums] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);
  const [photos, setPhotos] = useState<boolean>(false);

  const handlersAllFalse: () => void = () => {
    setStartPage(false);
    setPosts(false);
    setComments(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
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
    { id: 2, handle: handleAlbums, title: "albums", active: albums, variant: "outline-primary" },
    { id: 3, handle: handlePhotos, title: "photos", active: photos, variant: "outline-primary" },
    { id: 4, handle: handleTodos, title: "todos", active: todos, variant: "outline-primary" },
    { id: 5, handle: handleUsers, title: "users", active: users, variant: "outline-primary" },
    { id: 6, handle: handleTransition, title: "На верх страницы", active: startPage, variant: "outline-dark" },
  ];

  return (
    <div className="mt-6">
      <Container className="card">
        <Row>
          <h2 className="textCenter mb-4"> Используем createSlice() </h2>
        </Row>

        <ButtonsBlock buttons={buttons} />
      </Container>

      {posts && <PostSliceContainer />}
      {comments && <CommentSliceContainer />}
      {albums && <AlbumSliceContainer />}
      {photos && <PhotoSliceContainer />}
      {todos && <TodoSliceContainer />}
      {users && <UserSliceContainer />}
    </div>
  );
};

export default SlicePage;
