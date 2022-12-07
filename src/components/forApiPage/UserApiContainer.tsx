import React, { FC, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { IUser } from "../../models/types";
import { userAPI } from "../../services/UserService";
import PaginationButtons from "../gui/PaginationButtons";
import MySelect, { IOption } from "../gui/select/MySelect";
import UserItem from "../items/UserItem";

interface UserApiContainerProps {
  topOfPage: () => void;
}

const UserApiContainer: FC<UserApiContainerProps> = ({ topOfPage }) => {
  //================================================================================
  // PAGINATION
  const { data: totalCountElem } = userAPI.useFetchAllUsersQuery();
  let totalCount: number = 0;

  if (totalCountElem) {
    totalCount = totalCountElem.length;
  }
  const [limit] = useState<number>(5);
  // Вычисляем количество страниц
  let countPage: number = Math.ceil(totalCount / limit);
  // console.log(countPage);
  // Создаём массив pages[], состоящий из нумерации страниц, типа const pages = [1, 2, 3, 4, 5];
  // Этот массив нужен нам для пагинации
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }
  // console.log(pages);
  const [page, setPage] = useState<number>(1);
  const { data: users, error, isLoading } = userAPI.useGetUsersPaginationQuery(page);
  // PAGINATION
  //================================================================================

  const [createUser, { isError }] = userAPI.useCreateUserMutation();
  const [updateUser, { isError: updateIsError }] = userAPI.useUpdateUserMutation();
  const [deleteUser, { isError: deleteIsError }] = userAPI.useDeleteUserMutation();

  // аргументом в асинхронную функцию createUser() нам надо передать объект типа IUser
  // и поскольку ID у нас будет генерировать сервер, явно укажем, что объект as IUser
  const handleCreate = async () => {
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

  //==============================
  // Сортировка
  const options: IOption[] = [
    { value: "id", name: "По номеру пользователя" },
    { value: "name", name: "По имени пользователя" },
    { value: "username", name: "По нику пользователя" },
    { value: "email", name: "По email пользователя" },
    { value: "phone", name: "По телефону пользователя" },
    { value: "website", name: "По website пользователя" },
  ];
  const [selectedSort, setSelectedSort] = useState<string>("");

  function getSortedUsers() {
    if (selectedSort && users) {
      return [...users].sort((a, b) => (a[selectedSort] > b[selectedSort] ? 1 : -1));
    }
    return users;
  }

  const sortedUsers = getSortedUsers();

  const sortUsers = (sort: string) => {
    setSelectedSort(sort);
    // console.log("sort: " + sort);
  };
  // Сортировка
  //==============================

  return (
    <Container className="card">
      <Row>
        <div>
          <div>
            <h1 className="textCenter">Список пользователей из userAPI</h1>

            <div className="containerButton mt-1 mb-4">
              <Button variant="outline-info" onClick={handleTransition}>
                В начало страницы services createApi()
              </Button>

              <Button variant="outline-success mr-2 ml-2" onClick={handleCreate}>
                Добавить нового пользователя
              </Button>

              <MySelect
                defaultValue="Сортировка"
                disabled={true}
                options={options}
                value={selectedSort}
                onChangeValue={sortUsers}
              />
            </div>

            <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

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

            {sortedUsers &&
              sortedUsers.map((user) => (
                <UserItem key={user.id} user={user} update={handleUpdate} remove={handleRemove} />
              ))}
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default UserApiContainer;
