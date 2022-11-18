import React, { FC, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchPosts } from "../../store/reducers/ActionCreater";

const PostSliceContainer: FC = () => {
  // Этот хук возвращает ссылку на dispatch-функцию из хранилища Redux.
  // Вы можете использовать его для отправки действий по мере необходимости.
  const dispatch = useAppDispanch();

  // Вытаскиваем данные из состояния state.postReducer при помощи
  // типизированного нами useAppSelector()
  const { posts, isLoading, error } = useAppSelector((state) => state.postReducer);

  // Реализуем получение постов через dispatch из функции получения постов из
  // actionCreater.ts
  useEffect(() => {
    dispatch(fetchPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список постов из postReducer</h2>

          {isLoading && <h1> Идёт загрузка</h1>}

          <div>
            <>
              {error && (
                <h1>
                  <> {error} </>
                </h1>
              )}
            </>
          </div>

          {posts.map((post) => (
            <Card key={post.id}>
              <Card.Title>
                <b> Пользователь под номером: </b> {post.userId}
              </Card.Title>

              <i className="displayBlock">
                <b> Название поста: </b> {post.title}
              </i>

              <i className="displayBlock">
                <b> Пост: </b> {post.body}
              </i>
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default PostSliceContainer;
