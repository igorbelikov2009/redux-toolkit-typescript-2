import React, { FC, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { IPost } from "../../models/types";
import { addPostMich, fetchPostsMich } from "../../store/michReducer/postMichReducer";
import FormCreation from "../modal/FormCreation";
import PostMichItem from "./itemMich/PostMichItem";

export interface IFormsOfCreation {
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const PostMichContainer: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const dispatch = useAppDispanch();
  const { posts, status, error } = useAppSelector((state) => state.postMichReducer);
  // console.log(posts, status, error);

  const formsOfCreation: IFormsOfCreation[] = [
    {
      type: "text",
      value: userId,
      setValue: setUserId,
      placeholder: "Введите номер № пользователя",
    },
    {
      type: "text",
      value: title,
      setValue: setTitle,
      placeholder: "Введите название нового поста",
    },
    {
      type: "text",
      value: body,
      setValue: setBody,
      placeholder: "Введите текст нового поста",
    },
  ];

  const post: IPost = {
    userId: Number(userId),
    id: 0,
    title: title,
    body: body,
  };

  const handleAddPost = () => {
    if (post.userId && post.title && post.body) {
      dispatch(addPostMich(post));
      setUserId("");
      setTitle("");
      setBody("");
    }
  };

  useEffect(() => {
    dispatch(fetchPostsMich());
  }, [dispatch]);

  return (
    <Container className="card">
      <>
        <FormCreation formsOfCreation={formsOfCreation} addObject={handleAddPost} ButtonName="Добавить новый пост" />
      </>

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
