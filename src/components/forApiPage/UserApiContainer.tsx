import React, { FC } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { IUser } from "../../models/types";
import { userAPI } from "../../services/UserService";
import UserItem from "../items/UserItem";

interface UserApiContainerProps {
  topOfPage: () => void;
}

const UserApiContainer: FC<UserApiContainerProps> = ({ topOfPage }) => {
  const { data: users, error, isLoading } = userAPI.useFetchAllUsersQuery(20);
  const [createUser, { isError }] = userAPI.useCreateUserMutation();
  const [updateUser, { isError: updateIsError }] = userAPI.useUpdateUserMutation();
  const [deleteUser, { isError: deleteIsError }] = userAPI.useDeleteUserMutation();

  // аргументом в асинхронную функцию createUser() нам надо передать объект типа IUser
  // и поскольку ID у нас будет генерировать сервер, явно укажем, что объект as IUser
  const handleCreate = async () => {
    const name = prompt("Введите имя пользователя") || "";
    const username = prompt("Введите ник пользователя") || "";
    const email = prompt("Введите  email") || "";
    const phone = prompt("Введите телефон пользователя") || "";
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

    await createUser({
      name,
      username,
      email,
      phone,
      website,
      address: { street, suite, city, zipcode, geo: { lat: geoLat, lng: geoLng } },
      company: { name: companyName, catchPhrase: companyCatchPhrase, bs: companyBS },
    } as IUser);
  };

  const handleUpdate = (user: IUser) => {
    updateUser(user);
  };
  const handleRemove = (user: IUser) => {
    deleteUser(user);
  };

  const handleTransition = () => {
    topOfPage();
  };

  return (
    <Container className="card">
      <Row>
        <div>
          <div>
            <h1 className="textCenter">Список пользователей из userAPI</h1>

            <div className="containerButton">
              <Button variant="outline-info mr-4 mb-4" onClick={handleTransition}>
                В начало страницы services createApi()
              </Button>

              <Button variant="outline-success mb-4" onClick={handleCreate}>
                Добавить нового пользователя
              </Button>
            </div>

            <div>{isLoading && <h1> Идёт загрузка </h1>}</div>

            <div>
              {error && (
                <h1>
                  <> {error} </>
                </h1>
              )}
              {isError && (
                <h1>
                  <> {error} </>
                </h1>
              )}
              {updateIsError && (
                <h1>
                  <> {error} </>
                </h1>
              )}
              {deleteIsError && (
                <h1>
                  <> {error} </>
                </h1>
              )}
            </div>

            {users &&
              users.map((user) => <UserItem key={user.id} user={user} update={handleUpdate} remove={handleRemove} />)}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default UserApiContainer;
