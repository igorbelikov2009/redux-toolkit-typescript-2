import React, { FC } from "react";
import { IUser } from "../../models/types";
import { Card, Button } from "react-bootstrap";

interface UserItemProps {
  user: IUser;
  update: (user: IUser) => void;
  remove: (user: IUser) => void;
}

const UserItem: FC<UserItemProps> = ({ user, update, remove }) => {
  const handleUpdate = (event: React.MouseEvent) => {
    const name = prompt("Введите имя пользователя") || "";
    const username = prompt("Введите ник пользователя") || "";
    const email = prompt("Введите  email") || "";
    const phone = Number(prompt("Введите телефон пользователя") || "");
    const website = prompt("Введите ВЭБ сайт") || "";
    const street = prompt("Введите улицу проживания") || "";
    const suite = prompt("Введите suitу проживания") || "";
    const city = prompt("Введите город проживания") || "";
    const zipcode = prompt("Введите ZIPcode") || "";
    const geoLat = prompt("Введите географическую широту");
    const geoLng = prompt("Введите географическую долготу");
    const companyName = prompt("Введите название компании") || "";
    const companyCatchPhrase = prompt("Введите ключевую фразу компании");
    const companyBS = prompt("Введите БС компании");
    update({
      ...user,
      name,
      username,
      email,
      phone,
      website,
      address: { street, suite, city, zipcode, geo: { lat: geoLat, lng: geoLng } },
      company: { name: companyName, catchPhrase: companyCatchPhrase, bs: companyBS },
    });
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(user);
  };

  return (
    <Card className="card" onClick={handleUpdate}>
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

      {/* <i className="displayBlock">
        <b> company name: </b> {user.company.name};
      </i> */}

      <i className="card">
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

        <i className="card">
          <b>Координаты:</b>

          <i className="displayBlock ml-2">
            <b> lat: </b> {user.address.geo?.lat};
          </i>

          <i className="displayBlock ml-2">
            <b>lng: </b>
            {user.address.geo?.lng}.
          </i>
        </i>
      </i>

      <i className="card ">
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
      </i>
      <div className="containerButton">
        <Button variant="outline-success mb-4" onClick={handleRemove}>
          Удалить пользователя
        </Button>
      </div>
    </Card>
  );
};

export default UserItem;
