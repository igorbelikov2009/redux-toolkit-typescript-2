import React, { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../../hooks/redux";
import { getUsersPosts } from "../../../store/michReducer/usersMichReducer";

interface IDParams {
  id: string;
}

const PagePostsOfUser: FC = () => {
  const { id } = useParams<IDParams>();
  const dispatch = useAppDispanch();
  const history = useHistory();
  const { posts, error } = useAppSelector((state) => state.usersMichReducer);

  useEffect(() => {
    // id передаём из useParams()
    dispatch(getUsersPosts(id));
  }, [dispatch, id]);

  return (
    <Card className="mt-6">
      <div className="mt-2 mb-4">
        {error ? (
          <h3 className="colorRed"> {error} </h3>
        ) : (
          <div>
            <div className="flexColumn">
              <h1>Вы открыли страницу постов пользователя {id} </h1>

              <div className="displayFlex mt-2 mb-2">
                <Button
                  variant="outline-success"
                  className="mAuto"
                  onClick={() => history.push(`/michael/users/${id}`)}
                >
                  На страницу пользователя
                </Button>
              </div>
            </div>

            {posts &&
              posts.map((post) => (
                <Card className="post" key={post.id}>
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
                  </div>
                </Card>
              ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PagePostsOfUser;
