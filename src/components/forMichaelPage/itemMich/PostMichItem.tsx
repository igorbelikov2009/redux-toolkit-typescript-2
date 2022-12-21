import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { IPost } from "../../../models/types";
import { useAppDispanch } from "../../../hooks/redux";
import { deletePostMich, editPostMich } from "../../../store/michReducer/postMichReducer";
import { useHistory } from "react-router-dom";

interface PostMichItemProps {
  post: IPost;
}

const PostMichItem: FC<PostMichItemProps> = ({ post }) => {
  const history = useHistory();
  // console.log(history);
  const dispatch = useAppDispanch();

  const handleUpdate = (e: React.MouseEvent) => {
    const userId = prompt("Введите номер пользователя");
    const title = prompt("Введите название поста");
    const body = prompt("Введите содержимое поста");
    if (userId && title && body) {
      dispatch(editPostMich({ ...post, userId, title, body }));
    }
  };

  const handleHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push(`/michael/posts/${post.id}`);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deletePostMich(post.id));
  };

  return (
    <Card className="post" onClick={handleUpdate}>
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
          <div className="flexColumn">
            <Button variant="outline-success" className="mt-2" onClick={handleHistory}>
              Открыть
            </Button>

            <Button variant="outline-danger" className="mt-2" onClick={handleRemove}>
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostMichItem;
