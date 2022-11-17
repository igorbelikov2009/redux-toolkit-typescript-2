import React, { FC, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchUsers } from "../../store/reducers/ActionCreater";

const UserSliceContainer: FC = () => {
  const dispatch = useAppDispanch();
  // Вытаскиваем, необходимые для нас, данные из состояния при помощи
  // типизированного  в "./hooks/redux" селектора useAppSelector()
  const { users, isLoading, error } = useAppSelector((state) => state.userReducer);
  //   console.log(users, isLoading, error);

  // Реализуем получение пользователей
  // Если мы в ActionCreater.ts не используем createAsyncThunk, то fetchUsers без скобок()
  useEffect(() => {
    dispatch(fetchUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список пользователей from userSlice.reducer</h2>
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
        </div>
      </Row>
    </Container>
  );
};

export default UserSliceContainer;
