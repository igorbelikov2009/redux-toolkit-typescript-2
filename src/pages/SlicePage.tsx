import React, { FC, useState } from "react";
import UserSliceContainer from "../components/forSlice/UserSliceContainer";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Container } from "react-bootstrap";
import PostSliceContainer from "../components/forSlice/PostSliceContainer";
import CommentSliceContainer from "../components/forSlice/CommentSliceContainer";
import AlbumSliceContainer from "../components/forSlice/AlbumSliceContainer";
import TodoSliceContainer from "../components/forSlice/TodoSliceContainer";
import PhotoSliceContainer from "../components/forSlice/PhotoSliceContainer";

const SlicePage: FC = () => {
  const [posts, setPosts] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [almums, setAlbums] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);
  const [photos, setPhotos] = useState<boolean>(false);

  const handlePosts: () => void = () => {
    setPosts(true);
    setComments(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
    setPhotos(false);
  };
  const handleComments: () => void = () => {
    setComments(true);
    setPosts(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
    setPhotos(false);
  };
  const handleAlbums: () => void = () => {
    setAlbums(true);
    setComments(false);
    setPosts(false);
    setUsers(false);
    setTodos(false);
    setPhotos(false);
  };

  const handleTodos: () => void = () => {
    setTodos(true);
    setAlbums(false);
    setComments(false);
    setPosts(false);
    setUsers(false);
    setPhotos(false);
  };

  const handleUsers: () => void = () => {
    setUsers(true);
    setComments(false);
    setPosts(false);
    setAlbums(false);
    setTodos(false);
    setPhotos(false);
  };

  const handlePhotos: () => void = () => {
    setUsers(false);
    setComments(false);
    setPosts(false);
    setAlbums(false);
    setTodos(false);
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
        <ButtonGroup aria-label="Basic example">
          {buttons.map((button) => (
            <Button key={button.id} onClick={button.handle} variant="outline-primary">
              {button.title}
            </Button>
          ))}
        </ButtonGroup>
      </Container>

      {posts && <PostSliceContainer />}
      {comments && <CommentSliceContainer />}
      {almums && <AlbumSliceContainer />}
      {photos && <PhotoSliceContainer />}
      {todos && <TodoSliceContainer />}
      {users && <UserSliceContainer />}
    </div>
  );
};

export default SlicePage;
