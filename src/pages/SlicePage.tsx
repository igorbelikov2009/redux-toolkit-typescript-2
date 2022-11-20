import React, { FC, useState } from "react";
import UserSliceContainer from "../components/forSlice/UserSliceContainer";
//

import { Container, Row } from "react-bootstrap";
import PostSliceContainer from "../components/forSlice/PostSliceContainer";
import CommentSliceContainer from "../components/forSlice/CommentSliceContainer";
import AlbumSliceContainer from "../components/forSlice/AlbumSliceContainer";
import TodoSliceContainer from "../components/forSlice/TodoSliceContainer";
import PhotoSliceContainer from "../components/forSlice/PhotoSliceContainer";
import ButtonsBlock from "../components/ButtonsBlock";

const SlicePage: FC = () => {
  const [posts, setPosts] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [albums, setAlbums] = useState<boolean>(false);
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
          <h2 className="textCenter mb-4"> Используем createSlice() </h2>
        </Row>

        {/* <ButtonGroup aria-label="Basic example">
          {buttons.map((button) => (
            <Button key={button.id} onClick={button.handle} variant="outline-primary">
              {button.title}
            </Button>
          ))}
        </ButtonGroup> */}

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
