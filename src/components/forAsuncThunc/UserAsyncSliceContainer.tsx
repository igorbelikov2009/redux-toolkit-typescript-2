import React, { FC, useEffect } from "react";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchAsyncThunkUsers } from "../../store/reducers/ActionCreater";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const UserAsyncSliceContainer: FC = () => {
  const dispatch = useAppDispanch();

  // Вытаскиваем, необходимые для нас, данные из состояния при помощи типизированного
  // в "./hooks/redux" селектора
  const { users, isLoading, error } = useAppSelector((state) => state.userAsyncThunkReducer);
  // console.log(users, isLoading, error);

  // Реализуем получение пользователей
  // Когда мы в ActionCreater.ts используем createAsyncThunk,
  // то пишем fetchAsyncThunkUsers() со скобками
  useEffect(() => {
    dispatch(fetchAsyncThunkUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <h2 className="textCenter">Список пользователей userAsyncThunkReducer</h2>

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

        {users.map((user) => (
          <Card key={user.id} className="card">
            <Card.Title>
              <b> Пользователь под номером: </b> {user.id}
            </Card.Title>

            <i className="displayBlock">
              <b> имя пользователя: </b> {user.name}
            </i>

            <i className="displayBlock">
              <b>ник: </b> {user.username}
            </i>
            <i className="displayBlock">
              <b>email:</b> {user.email}
            </i>
            <i className="displayBlock">
              <b>телефон:</b> {user.phone}
            </i>
            <i className="displayBlock">
              <b>ВЭБ сайт:</b> {user.website}
            </i>

            <i className="displayBlock">
              <b> company name: </b> {user.company.name}
            </i>
            <i className="displayBlock">
              <b>город:</b> {user.address.city}
            </i>
            <i className="displayBlock">
              <b>улица:</b> {user.address.street}
            </i>
            <i className="displayBlock">
              <b> suite: </b> {user.address.suite}
            </i>
            <i className="displayBlock">
              <b>zipcode: </b>
              {user.address.zipcode}
            </i>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default UserAsyncSliceContainer;
