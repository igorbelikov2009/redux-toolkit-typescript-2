import React, { FC, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { IPost } from "../../models/types";
import { addPostMich, fetchPostsMich } from "../../store/michReducer/postMichReducer";
import FormCreation, { IFormsOfCreation } from "../modal/FormCreation";
import MyModal from "../modal/MyModal";
import PostMichItem from "./itemMich/PostMichItem";

const PostMichContainer: FC = () => {
  // title, body, userId для создания нового объекта (post)
  // и формы создания нового объекта (post) formsOfCreation
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Модалка
  const [modal, setModal] = useState<boolean>(false);

  const dispatch = useAppDispanch();
  const { posts, status, error } = useAppSelector((state) => state.postMichReducer);
  // console.log(posts, status, error);

  // форма создания нового объекта
  const formsOfCreation: IFormsOfCreation[] = [
    {
      type: "text",
      value: userId,
      setValue: setUserId,
      placeholder: "Введите № пользователя",
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

  // создаём новый объект (post), как аргумент:
  //  для dispatch(addPostMich(post)) на этой странице. Строка 59.
  //  для addPostMich в PostMichReducer. Строка 88
  const post: IPost = {
    userId: Number(userId), // берём из созданного нами состояния
    id: 0, // назначаем 0, потом ему автоматически присвоится значение
    // на один больше последнего id
    title: title, // берём из созданного нами состояния
    body: body, // берём из созданного нами состояния
  };

  const handleAddPost = () => {
    if (post.userId && post.title && post.body) {
      dispatch(addPostMich(post));
      setUserId("");
      setTitle("");
      setBody("");
      setModal(false);
    }
  };

  useEffect(() => {
    dispatch(fetchPostsMich());
  }, [dispatch]);

  return (
    <Container className="card">
      <div className="containerButton mt-2 mb-4">
        <Button variant="outline-success" onClick={() => setModal(true)}>
          Создать новый пост
        </Button>
      </div>

      <Row>
        <h2 className="textCenter mb-4">Список постов пользователей из postMichReducer</h2>

        <div>
          {status === "loading" && <h1 className="textCenter">Идёт загрузка</h1>}

          <div>{error && <h1 className="textCenter"> {error} </h1>}</div>
        </div>

        {posts && posts.map((post) => <PostMichItem post={post} key={post.id} />)}
      </Row>

      <MyModal visible={modal} setVisible={setModal}>
        <FormCreation formsOfCreation={formsOfCreation} addObject={handleAddPost} ButtonName="Добавить новый пост" />
      </MyModal>
    </Container>
  );
};

export default PostMichContainer;
