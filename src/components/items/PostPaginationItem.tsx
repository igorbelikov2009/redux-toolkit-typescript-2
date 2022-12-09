import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { IPost } from "../../models/types";

interface PostPaginationItemProps {
  post: IPost;
  remove: (post: IPost) => void;
}

const PostPaginationItem: FC<PostPaginationItemProps> = ({ post, remove }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    remove(post);
  };

  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <i className="displayBlock">
            Пост № <b> {post.id} </b>
          </i>

          <i className="displayBlock">
            <b> Заглавие: </b> {post.title}.
          </i>

          <i className="displayBlock">
            <b> Содержимое: </b> {post.body}
          </i>
        </div>

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2" onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostPaginationItem;
