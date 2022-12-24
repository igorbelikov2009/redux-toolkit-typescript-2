import React, { FC, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispanch, useAppSelector } from "../../../hooks/redux";
import { fetchUserMichById } from "../../../store/michReducer/usersMichReducer";
import { MICHAEL_USERS_ROUTE } from "../../../routes";

interface IDParams {
  id: string;
}

const UserIdPageMich: FC = () => {
  const { id } = useParams<IDParams>();
  // console.log(id);
  const dispatch = useAppDispanch();
  const { user, error } = useAppSelector((state) => state.usersMichReducer);
  //   console.log(user, error, );
  const history = useHistory();
  // console.log(history);

  useEffect(() => {
    // id передаём из useParams()
    dispatch(fetchUserMichById(id));
  }, [dispatch, id]);

  return (
    <Card className="mt-6">
      <div className="mt-2 mb-4">
        {error ? (
          <h3 className="colorRed"> {error} </h3>
        ) : (
          <div>
            <h1>Вы открыли страницу пользователя ID = {id} </h1>

            <Card className="card">
              <div>
                <Card.Title>
                  <b> Пользователь №</b> {user.id}
                </Card.Title>

                <i className="displayBlock">
                  <b> Имя: </b> {user.name};
                </i>

                <i className="displayBlock">
                  <b>ник: </b> {user.username};
                </i>
                <i className="displayBlock">
                  <b>email:</b> {user.email};
                </i>
                <i className="displayBlock">
                  <b>телефон:</b> {user.phone};
                </i>
                <i className="displayBlock">
                  <b>ВЭБ сайт:</b> {user.website};
                </i>

                <b> адрес: </b>
                <i className="displayBlock ml-2">
                  <b>город:</b> {user.address.city};
                </i>
                <i className="displayBlock ml-2">
                  <b>улица:</b> {user.address.street};
                </i>
                <i className="displayBlock ml-2">
                  <b> suite: </b> {user.address.suite};
                </i>
                <i className="displayBlock ml-2">
                  <b>zipcode: </b>
                  {user.address.zipcode}.
                </i>
                <b>Координаты:</b>

                <i className="displayBlock ml-2">
                  <b> lat: </b> {user.address.geo?.lat};
                </i>

                <i className="displayBlock ml-2">
                  <b>lng: </b>
                  {user.address.geo?.lng}.
                </i>

                <b>Company:</b>
                <i className="displayBlock ml-2">
                  <b>name: </b>
                  {user.company.name}.
                </i>
                <i className="displayBlock ml-2">
                  <b>catchPhrase: </b>
                  {user.company.catchPhrase}.
                </i>
                <i className="displayBlock ml-2">
                  <b>bs: </b>
                  {user.company.bs}.
                </i>
              </div>

              <div className="displayFlex mt-4">
                <Button variant="outline-info  mr-2" onClick={() => history.push(`/michael/users/${id}/posts`)}>
                  Посты пользователя
                </Button>
                <Button variant="outline-info  mr-2" onClick={() => history.push(`/michael/users/${id}/todos`)}>
                  Список дел пользователя
                </Button>
                <Button variant="outline-info" onClick={() => history.push(`/michael/users/${id}/albums`)}>
                  Альбомы с фотографиями
                </Button>
              </div>
            </Card>
            <Button variant="outline-success" onClick={() => history.push(MICHAEL_USERS_ROUTE)}>
              К списку пользователей
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserIdPageMich;
