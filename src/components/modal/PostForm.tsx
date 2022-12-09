import React, { FC } from "react";
import { IPost } from "../../models/types";

interface PostFormProps {
  create: (newPost: IPost) => void;
}

const PostForm: FC<PostFormProps> = ({ create }) => {
  return <div>PostForm</div>;
};

export default PostForm;
