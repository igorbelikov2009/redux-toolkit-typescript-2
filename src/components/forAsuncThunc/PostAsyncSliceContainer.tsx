import React, { FC, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchAsyncThunkPosts } from "../../store/reducers/ActionCreater";

const PostAsyncSliceContainer: FC = () => {
  // Возвращаем ссылку на на dispatch-функцию из хранилища Redux
  // при помощи типизированного нами хука
  const dispatch = useAppDispanch();

  // Вытаскиваем данные из состояния state.postAsuncThunkReducer при помощи
  // типизированного нами useAppSelector()
  const { posts, isLoading, error } = useAppSelector((state) => state.postAsuncThunkReducer);

  // Реализуем получение списка постов через dispatch из функции получения списка постов
  // Когда мы в ActionCreater.ts используем createAsyncThunk,
  // то пишем fetchAsyncThunkPosts() со скобками
  useEffect(() => {
    dispatch(fetchAsyncThunkPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список постов из postAsuncThunkReducer</h2>
          {isLoading && <h1>Идёт загрузка</h1>}

          <div>{error && <h1>{error} </h1>}</div>

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

export default PostAsyncSliceContainer;
