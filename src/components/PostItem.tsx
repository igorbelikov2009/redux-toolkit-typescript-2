import React, { FC } from "react";
import { IPost } from "../models/IPost";

// задаём типы пропсов компонента
interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    // У event вызываем stopPropagation() для того, чтобы предотвратить всплытие,
    event.stopPropagation();
    remove(post);
  };
  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || "";
    update({ ...post, title });
  };

  return (
    // При нажатии на блок div, мы будем вызывать обновление нашего поста.
    <div className="post" onClick={handleUpdate}>
      <div className="postItem">
        {post.id}. {post.title}
        {/* <button className="ml-2" onClick={() => remove(post)}>
          delete
        </button> */}
        <button className="ml-2" onClick={handleRemove}>
          delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
