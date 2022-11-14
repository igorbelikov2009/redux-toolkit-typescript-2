import React, { FC } from "react";
import { IPost } from "../models/IPost";

interface PostItemProps {
  post: IPost;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  const deletePost = () => {
    console.log("Ok");
  };

  return (
    <div className="post">
      <div className="postItem">
        {post.id}. {post.title}
        <button className="ml-2" onClick={() => deletePost()}>
          delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
