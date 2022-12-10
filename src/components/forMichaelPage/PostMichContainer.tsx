import React, { FC, useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { IPost } from "../../models/types";
import { addPostMich, fetchPostsMich } from "../../store/michReducer/postMichReducer";
import MyInput from "../gui/input/MyInput";
import PostMichItem from "./itemMich/PostMichItem";

const PostMichContainer: FC = () => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const dispatch = useAppDispanch();
  const { posts, status, error } = useAppSelector((state) => state.postMichReducer);
  // console.log(posts, status, error);

  const post: IPost = {
    userId: 1,
    id: 0,
    title: newTitle,
    body: newBody,
  };

  const handleAddPost = () => {
    if (post) {
      dispatch(addPostMich(post));
    }
  };

  useEffect(() => {
    dispatch(fetchPostsMich());
  }, [dispatch]);

  return (
    <Container className="card">
      <Form>
        <MyInput
          className="mb-2 fullWidth"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Введите название нового поста"
        />
        <MyInput
          className="mb-2 fullWidth"
          type="text"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Введите текст нового поста"
        />
        <Button variant="outline-success" onClick={handleAddPost}>
          Добавить новый пост
        </Button>
      </Form>

      <Row>
        <h2 className="textCenter mb-4">Список дел пользователя из postMichReducer</h2>

        <div>
          {status === "loading" && <h1 className="textCenter">Идёт загрузка</h1>}

          <div>{error && <h1 className="textCenter"> {error} </h1>}</div>
        </div>

        {posts && posts.map((post) => <PostMichItem post={post} key={post.id} />)}
      </Row>
    </Container>
  );
};

export default PostMichContainer;
