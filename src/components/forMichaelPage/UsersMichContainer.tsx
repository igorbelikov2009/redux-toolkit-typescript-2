import React, { FC, useEffect, useState, useMemo } from "react";
import { Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { IFilter, IUser } from "../../models/types";
import { fetchUsersMich, addUserMich } from "../../store/michReducer/usersMichReducer";
import PaginationButtons from "../gui/PaginationButtons";
import RoutesBlock from "../gui/RoutesBlock";
import MySelect, { IOption } from "../gui/select/MySelect";
import FormCreation, { IFormsOfCreation } from "../modal/FormCreation";
import MyModal from "../modal/MyModal";
import SortFilter from "../SortFilter";
import UserMichItem from "./itemMich/UserMichItem";

const UsersMichContainer: FC = () => {
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const history = useHistory();
  const location = history.location.pathname;
  const dispatch = useAppDispanch();
  const { res, isLoading, error } = useAppSelector((state) => state.usersMichReducer);
  const users = res.users;

  // pagination
  const totalCount = res.totalCount; // общее количество элементов полученных с сервера
  const countPage = Math.ceil(totalCount / limit); // Вычисляем количество страниц
  const pages: number[] = []; // Создаём массив pages[], состоящий из нумерации страниц,
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }
  const optionsLimit: IOption[] = [
    { value: "1", name: 1 },
    { value: "5", name: 5 },
    { value: "10", name: 10 },
  ];
  // pagination

  // для создания нового объекта
  // и формы создания нового объекта formsOfCreation
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [suite, setSuite] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [zipcode, setzZipcode] = useState<string>("");
  const [geoLat, setGeoLat] = useState<string>("");
  const [geoLng, setGeoLng] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [catchPhrase, setCatchPhrase] = useState<string>("");
  const [companyBS, setCompanyBS] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  // форма создания нового объекта
  const formsOfCreation: IFormsOfCreation[] = [
    { type: "text", value: name, setValue: setName, placeholder: "Введите имя пользователя" },
    { type: "text", value: username, setValue: setUsername, placeholder: "Введите ник пользователя" },
    { type: "text", value: email, setValue: setEmail, placeholder: "Введите  email" },
    { type: "text", value: phone, setValue: setPhone, placeholder: "Введите телефон пользователя" },
    { type: "text", value: website, setValue: setWebsite, placeholder: "Введите ВЭБ сайт" },
    { type: "text", value: street, setValue: setStreet, placeholder: "Введите улицу проживания" },
    { type: "text", value: suite, setValue: setSuite, placeholder: "Введите suitу проживания" },
    { type: "text", value: city, setValue: setCity, placeholder: "Введите город проживания" },
    { type: "text", value: zipcode, setValue: setzZipcode, placeholder: "Введите ZIPcode" },
    { type: "text", value: geoLat, setValue: setGeoLat, placeholder: "Введите географическую широту" },
    { type: "text", value: geoLng, setValue: setGeoLng, placeholder: "Введите географическую долготу" },
    { type: "text", value: companyName, setValue: setCompanyName, placeholder: "Введите название компании" },
    { type: "text", value: catchPhrase, setValue: setCatchPhrase, placeholder: "Ключевая фраза компании" },
    { type: "text", value: companyBS, setValue: setCompanyBS, placeholder: "Введите БС компании" },
  ];
  // создаём новый объект (user), как аргумент:
  const user: IUser = {
    id: 0,
    name: name,
    username: username,
    email: email,
    phone: Number(phone),
    website: website,
    address: {
      street: street,
      suite: suite,
      city: city,
      zipcode: zipcode,
      geo: {
        lat: geoLat,
        lng: geoLng,
      },
    },
    company: {
      name: companyName,
      catchPhrase: catchPhrase,
      bs: companyBS,
    },
  };
  const resetAllStates = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setStreet("");
    setSuite("");
    setCity("");
    setzZipcode("");
    setGeoLat("");
    setGeoLng("");
    setCompanyName("");
    setCatchPhrase("");
    setCompanyBS("");
  };
  const handleAddUser = () => {
    dispatch(addUserMich(user));
    resetAllStates();
    setModal(false);
  };

  // Сортировка и поиск
  const [filter, setFilter] = useState<IFilter>({ query: "", sort: "" });
  const optionsSort: IOption[] = [
    { value: "id", name: "По номеру пользователя" },
    { value: "name", name: "По имени пользователя" },
    { value: "username", name: "По нику пользователя" },
    { value: "email", name: "По email пользователя" },
    { value: "phone", name: "По телефону пользователя" },
    { value: "website", name: "По ВЭБ-сайту пользователя" },
  ];
  // Получаем отсортированный массив.
  const sortedUsers = useMemo(() => {
    if (filter.sort && users) {
      return [...users].sort((a, b) => (a[filter.sort] > b[filter.sort] ? 1 : -1));
    }
    return users;
  }, [filter.sort, users]);
  // Отсортированный и отфильтрованный массив:
  const sortedAndSearchedUsers = useMemo(() => {
    if (sortedUsers) {
      return sortedUsers.filter((user) => user.name?.toLowerCase().includes(filter.query));
    }
  }, [filter.query, sortedUsers]);

  useEffect(() => {
    dispatch(fetchUsersMich({ limit, page }));
  }, [dispatch, limit, page]);

  return (
    <div>
      <div className="routeBar">
        <RoutesBlock location={location} />
      </div>

      <div className="rightBlock  mt-6">
        {isLoading && <h1 className="textCenter">Идёт загрузка</h1>}

        <div>
          {error ? (
            <h3 className="textCenter colorRed"> {error} </h3>
          ) : (
            <div className="card">
              <Row>
                <div className="mb-4">
                  <MySelect
                    defaultValue="Выберите количество пользователей на странице"
                    disabled={true}
                    value={limit}
                    onChangeValue={setLimit}
                    titleSelect="Выберите количество пользователей на странице"
                    options={optionsLimit}
                  />
                </div>

                <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

                <h2 className="textCenter mb-4">Список пользователей из usersMichReducer</h2>
                <h6>Логика сортировки и поиска вынесена в отдельный хук: useSortedAndSearchedArray.</h6>

                <SortFilter
                  filter={filter}
                  setFilter={setFilter}
                  placeholder="Поиск по имени пользователя"
                  options={optionsSort}
                />

                <div className="containerButton mt-2 mb-4">
                  <Button variant="outline-success" onClick={() => setModal(true)}>
                    Создать нового пользователя
                  </Button>
                </div>

                {sortedAndSearchedUsers &&
                  sortedAndSearchedUsers.map((user) => <UserMichItem key={user.id} user={user} />)}
              </Row>

              <MyModal visible={modal} setVisible={setModal}>
                <FormCreation
                  formsOfCreation={formsOfCreation}
                  addObject={handleAddUser}
                  ButtonName="Добавить новый альбом"
                />
              </MyModal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersMichContainer;
// регистрируем в store.ts
