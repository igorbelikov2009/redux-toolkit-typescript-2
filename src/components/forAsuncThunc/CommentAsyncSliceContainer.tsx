import React, { FC, useEffect } from "react";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchAsyncThunkComments } from "../../store/reducers/ActionCreater";

import { Container, Row, Card } from "react-bootstrap";

const CommentAsyncSliceContainer: FC = () => {
  const dispatch = useAppDispanch();
  const { comments, isLoading, error } = useAppSelector((state) => state.commentAsyncThunkReducer);

  useEffect(() => {
    dispatch(fetchAsyncThunkComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   return <div>CommentAsyncSliceContainer</div>;
  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4"> Комеентарии к постам из commentAsyncThunkReducer</h2>
          {isLoading && <h1>Идёт загрузка</h1>}

          <div>{error && <h1> {error}</h1>}</div>

          {comments.map((comment) => (
            <Card key={comment.id}>
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
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default CommentAsyncSliceContainer;
