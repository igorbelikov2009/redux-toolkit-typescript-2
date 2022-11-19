import React, { FC, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchComments } from "../../store/reducers/ActionCreater";

const CommentSliceContainer: FC = () => {
  const dispatch = useAppDispanch();
  const { comments, isLoading, error } = useAppSelector((state) => state.commentReducer);

  useEffect(() => {
    dispatch(fetchComments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    comments.filter((comment, index) => comment.id === index);
  };

  return (
    <div>
      <Container>
        <Row>
          <h2 className="textCenter mb-4"> Список комментариев из commentReducer</h2>
          {isLoading && <h1> Идёт загрузка</h1>}

          <div>{error && <h1>{error}</h1>}</div>

          {comments.map((comment, index) => (
            <Card key={comment.id}>
              <div className="cardBlock">
                <div className="cardDescription">
                  <i>
                    <i> под постом номером: </i> <b> {comment.postId} </b>
                  </i>

                  <i className="displayBlock">
                    <i>
                      пользователь с <b> email: </b> {comment.email}
                    </i>
                  </i>

                  <i className="displayBlock">
                    <i>оставил комментарий: </i> <b>{comment.name}</b>
                  </i>

                  <i className="displayBlock">{comment.body}</i>
                </div>

                <div className="cardButton">
                  <Button onClick={handleDelete} variant="outline-primary">
                    Удалить
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CommentSliceContainer;
