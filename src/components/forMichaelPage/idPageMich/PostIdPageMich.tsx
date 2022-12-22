import React, { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../../hooks/redux";
import { fetchComments, fetchPostById } from "../../../store/michReducer/postMichReducer";
import { MICHAEL_POSTS_ROUTE, MICHAEL_COMMENTS_ROUTE } from "../../../routes";

interface IDParams {
  id?: string;
}

const PostIdPageMich: FC = () => {
  const dispatch = useAppDispanch();
  const { post, comments, error, errorComments } = useAppSelector((state) => state.postMichReducer);
  // console.log(post, error, comments, errorComments);
  const { id } = useParams<IDParams>();
  // console.log(id);
  const history = useHistory();

  useEffect(() => {
    // id передаём из useParams()
    dispatch(fetchPostById(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const toPostsPage: () => void = () => {
    history.push(MICHAEL_POSTS_ROUTE);
  };
  const toCommentsPage: () => void = () => {
    history.push(MICHAEL_COMMENTS_ROUTE);
  };

  return (
    <Card className="mt-6">
      <div className="mt-2 mb-4">
        {error ? (
          <h1> {error} </h1>
        ) : (
          <div>
            <div>
              <h1>Вы открыли страницу поста ID = {id} </h1>

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
                    <Button variant="outline-success" className="mt-2" onClick={toPostsPage}>
                      На страницу постов
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {errorComments ? (
              <h1> {errorComments} </h1>
            ) : (
              <div>
                <div className="cardBlock">
                  <div className="cardDescription">
                    <h1 className="mt-4"> Комментарии к этому посту </h1>
                  </div>

                  <div className="cardButton">
                    <Button variant="outline-primary" className="mt-2" onClick={toCommentsPage}>
                      К комментариям
                    </Button>
                  </div>
                </div>
                {comments &&
                  comments.map((comment) => (
                    <Card key={comment.id}>
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
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostIdPageMich;
