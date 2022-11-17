import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";

// import PostContainer from "./components/PostContainer";
// import PostContainer2 from "./components/PostContainer2";
import TodoContainer from "./components/TodoContainer";
import { useAppDispanch, useAppSelector } from "./hooks/redux";
import SlicePage from "./pages/SlicePage";
// import CounterPage from "./pages/CounterPage";
import { fetchAsyncThunkUsers } from "./store/reducers/ActionCreater";

function App() {
  const dispatch = useAppDispanch();

  // Вытаскиваем, необходимые для нас, данные из состояния при помощи типизированного
  // в "./hooks/redux" селектора
  const { users, isLoading, error } = useAppSelector((state) => state.userAsyncThunkReducer);
  // console.log(users, isLoading, error);

  // // // Реализуем получение пользователей
  // // //=======================================================================================
  // // Когда мы в ActionCreater.ts используем createAsyncThunk, то fetchUsers() со скобками
  useEffect(() => {
    dispatch(fetchAsyncThunkUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //  //=======================================================================================

  return (
    <div>
      <NavBar />
      {/* <CounterPage /> */}
      {/* <SlicePage /> */}

      <div>
        <h1 className="textCenter">Список пользователей AsyncThunk</h1>

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
          <div key={user.id} className="mb-1">
            <i className="displayBlock">
              <b> Пользователь под номером : </b> {user.id}
            </i>

            <i className="displayBlock">
              <b> имя пользователя : </b> {user.name}
            </i>

            <i className="displayBlock">
              <b>ник : </b> {user.username}
            </i>
            <i className="displayBlock">
              <b>email :</b> {user.email}
            </i>
            <i className="displayBlock">
              <b>телефон :</b> {user.phone}
            </i>
            <i className="displayBlock">
              <b>ВЭБ сайт :</b> {user.website}
            </i>

            <i className="displayBlock">
              <b> company name: </b> {user.company.name}
            </i>
            <i className="displayBlock">
              <b>город :</b> {user.address.city}
            </i>
            <i className="displayBlock">
              <b>улица :</b> {user.address.street}
            </i>
            <i className="displayBlock">
              <b> suite :</b> {user.address.suite}
            </i>
            <i className="displayBlock">
              <b>zipcode :</b>
              {user.address.zipcode}
            </i>
          </div>
        ))}
      </div>

      <Container>
        {/* <Row>
          <Col md={6}>
            <PostContainer />
          </Col>

          <Col md={6}>
            <PostContainer2 />
          </Col>
        </Row> */}

        <Row>
          <Col md={12}></Col>

          <TodoContainer />
        </Row>
      </Container>
    </div>
  );
}

export default App;
