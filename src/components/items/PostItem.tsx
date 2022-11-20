import React, { FC } from "react";
import { IPost } from "../../models/types";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

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
    <Card className="post" onClick={handleUpdate}>
      <div className="postItem">
        {post.id}. {post.title}
        <Button variant="outline-danger" className="ml-2" onClick={handleRemove}>
          Удалить
        </Button>
      </div>
    </Card>
  );
};

export default PostItem;
