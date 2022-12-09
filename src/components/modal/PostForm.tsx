import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query/react";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { FC, useState } from "react";

import { Form, Button } from "react-bootstrap";
import { IPost } from "../../models/types";

interface PostFormProps {
  addPost: MutationTrigger<
    MutationDefinition<
      IPost,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      "Post",
      IPost,
      "postPaginationAPI"
    >
  >;
}

const PostForm: FC<PostFormProps> = ({ addPost }) => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");

  const handleAddPost = async () => {
    if (newTitle && newBody) {
      await addPost({
        title: newTitle,
        body: newBody,
        id: 0,
      }).unwrap();
      setNewTitle("");
      setNewBody("");
    }
  };
  return (
    <div className="card mr-2">
      <Form.Control
        className="mb-2"
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Введите название нового поста"
      />
      <Form.Control
        className="mb-2"
        type="text"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        placeholder="Введите текст нового поста"
      />
      <Button variant="outline-success" onClick={handleAddPost}>
        Добавить новый пост
      </Button>
    </div>
  );
};

export default PostForm;
