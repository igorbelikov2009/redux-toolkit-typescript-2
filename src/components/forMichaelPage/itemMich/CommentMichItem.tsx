import React, { FC } from "react";
import { Card, Button } from "react-bootstrap";
import { useAppDispanch } from "../../../hooks/redux";
import { IComment } from "../../../models/types";
import { deleteCommentMich, editCommentMich } from "../../../store/michReducer/commentsMichReducer";

interface CommentMichItemProps {
  comment: IComment;
}

const CommentMichItem: FC<CommentMichItemProps> = ({ comment }) => {
  const dispatch = useAppDispanch();

  const handleUpdate = (e: React.MouseEvent) => {
    const postId = Number(prompt("Введите номер поста"));
    const email = prompt("Введите email пользователя");
    const name = prompt("Введите название комментария");
    const body = prompt("Введите содержимое комментария");

    if (email && body) {
      dispatch(editCommentMich({ ...comment, postId, email, name, body }));
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteCommentMich(comment.id));
  };

  return (
    <Card onClick={handleUpdate}>
      <div className="cardBlock">
        <div className="cardDescription">
          <i>
            <i> Пост № </i> <b> {comment.postId}. </b>
          </i>

          <i className="displayBlock">
            <i>
              Пользователь: <b> {comment.email} </b>
            </i>
          </i>

          <i className="displayBlock">
            Комментарий № <b> {comment.id}: </b>
          </i>

          <i className="displayBlock">
            Заглавие: <b> {comment.name}. </b>
          </i>

          <i className="displayBlock">
            <b> Содержимое: </b>
            {comment.body}.
          </i>
        </div>

        <div className="cardButton">
          <Button onClick={handleRemove} variant="outline-danger">
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CommentMichItem;
