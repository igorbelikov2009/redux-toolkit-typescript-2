import React, { FC, useState } from "react";
import { Container } from "react-bootstrap";
import ButtonsBlock from "../components/ButtonsBlock";
import AlbumsMichContainer from "../components/forMichaelPage/AlbumsMichContainer";
import CommentsMichContainer from "../components/forMichaelPage/CommentsMichContainer";
import PhotosMichContainer from "../components/forMichaelPage/PhotosMichContainer";
import PostMichContainer from "../components/forMichaelPage/PostMichContainer";
import ProductsMichContainer from "../components/forMichaelPage/ProductsMichContainer";
import TodosMichContainer from "../components/forMichaelPage/TodosMichContainer";
import UsersMichContainer from "../components/forMichaelPage/UsersMichContainer";
import { IButton } from "../models/types";

const MichaelPage: FC = () => {
  const [startPage, setStartPage] = useState<boolean>(true); // true
  const [posts, setPosts] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [albums, setAlbums] = useState<boolean>(false);
  const [photos, setPhotos] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [products, setProducts] = useState<boolean>(false);

  const handlersAllFalse: () => void = () => {
    setStartPage(false);
    setPosts(false);
    setComments(false);
    setAlbums(false);
    setPhotos(false);
    setTodos(false);
    setUsers(false);
    setProducts(false);
  };

  const handlePost: () => void = () => {
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
  const handlePhotos: () => void = () => {
    handlersAllFalse();
    setPhotos((prev) => !prev);
  };
  const handleTodos: () => void = () => {
    handlersAllFalse();
    setTodos((prev) => !prev);
  };
  const handleUsers: () => void = () => {
    handlersAllFalse();
    setUsers((prev) => !prev);
  };

  const handleProducts: () => void = () => {
    handlersAllFalse();
    setProducts((prev) => !prev);
  };

  const handleTransition: () => void = () => {
    handlersAllFalse();
    setStartPage(true);
  };

  const buttons: IButton[] = [
    { id: 1, handle: handlePost, title: "posts", active: posts, variant: "outline-primary" },
    { id: 2, handle: handleComments, title: "comments", active: comments, variant: "outline-primary" },
    { id: 3, handle: handleAlbums, title: "albums", active: albums, variant: "outline-primary" },
    { id: 4, handle: handlePhotos, title: "photos", active: photos, variant: "outline-primary" },
    { id: 5, handle: handleTodos, title: "todos", active: todos, variant: "outline-primary" },
    { id: 6, handle: handleUsers, title: "users", active: users, variant: "outline-primary" },
    { id: 7, handle: handleProducts, title: "products", active: products, variant: "outline-primary" },
  ];

  return (
    <div className="mt-6">
      <Container className="card">
        <ButtonsBlock buttons={buttons} />

        {startPage && (
          <div className="mt-4">
            <h1 className="textCenter mb-4">MichaelPage</h1>
          </div>
        )}
      </Container>

      {posts && <PostMichContainer />}
      {comments && <CommentsMichContainer />}
      {albums && <AlbumsMichContainer />}
      {photos && <PhotosMichContainer />}
      {todos && <TodosMichContainer />}
      {users && <UsersMichContainer />}
      {products && <ProductsMichContainer />}
    </div>
  );
};

export default MichaelPage;
