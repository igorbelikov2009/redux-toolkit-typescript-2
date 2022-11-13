import React, { useEffect } from "react";
import "./App.css";
import { useAppDispanch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/ActionCreater";
import { userSlice } from "./store/reducers/UserSlice";

function App() {
  const dispatch = useAppDispanch();

  // Вытаскиваем, необходимые для нас, данные из состояния
  const { users, isLoading, error } = useAppSelector((state) => state.userReducer);
  console.log(users, isLoading, error);

  // Реализуем получение пользователей
  useEffect(() => {
    dispatch(fetchUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-2">
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
  );
}

export default App;
