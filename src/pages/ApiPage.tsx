import React, { FC, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ButtonsBlock from "../components/ButtonsBlock";
import CommentApiContainer from "../components/forApiPage/CommentApiContainer";
import PostCombinedContainer from "../components/forApiPage/PostCombinedContainer";

import TodoContainer from "../components/forApiPage/TodoContainer";

const ApiPage: FC = () => {
  const [postCombined, setPostCombined] = useState<boolean>(false);
  const [users, setUsers] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [albums, setAlbums] = useState<boolean>(false);
  const [todos, setTodos] = useState<boolean>(false);
  const [photos, setPhotos] = useState<boolean>(false);

  const handlersAllFalse: () => void = () => {
    setComments(false);
    setUsers(false);
    setAlbums(false);
    setTodos(false);
    setPhotos(false);
    setPostCombined(false);
  };

  const handlePostsCombined: () => void = () => {
    handlersAllFalse();
    setPostCombined(true);
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
    { id: 1, handle: handlePostsCombined, title: "postsCombined" },
    { id: 2, handle: handleComments, title: "comments" },
    { id: 3, handle: handleAlbums, title: "albums" },
    { id: 4, handle: handlePhotos, title: "photos" },
    { id: 5, handle: handleTodos, title: "todos" },
    { id: 6, handle: handleUsers, title: "users" },
  ];

  return (
    <div className="mt-6">
      <Container className="card">
        <Row>
          <h2 className="textCenter mb-4 ">Используем ApiPage</h2>
        </Row>

        <ButtonsBlock buttons={buttons} />
      </Container>

      {comments && <CommentApiContainer />}
      {postCombined && <PostCombinedContainer />}
      {todos && <TodoContainer />}
    </div>
  );
};

export default ApiPage;
