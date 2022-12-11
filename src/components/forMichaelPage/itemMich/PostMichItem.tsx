import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { IPost } from "../../../models/types";
import { useAppDispanch } from "../../../hooks/redux";
import { deletePostMich } from "../../../store/michReducer/postMichReducer";

interface PostMichItemProps {
  post: IPost;
}

const PostMichItem: FC<PostMichItemProps> = ({ post }) => {
  const dispatch = useAppDispanch();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deletePostMich(post.id));
  };

  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> пользователь № </i> <b> {post.userId} </b>
          </Card.Title>
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

export default PostMichItem;
