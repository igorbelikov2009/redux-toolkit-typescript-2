import React, { FC, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { useSortedAndSearchedArray } from "../../hooks/useSortedAndSearchedArray";
import { IAlbum, IFilter } from "../../models/types";
import { addAlbumMich, fetchAlbumsMich } from "../../store/michReducer/albumsMichReducer";
import { IOption } from "../gui/select/MySelect";
import FormCreation, { IFormsOfCreation } from "../modal/FormCreation";
import MyModal from "../modal/MyModal";
import SortFilter from "../SortFilter";
import AlbumsMichItem from "./itemMich/AlbumsMichItem";

const AlbumsMichContainer: FC = () => {
  // title, userId для создания нового объекта
  // и формы создания нового объекта formsOfCreation
  const [userId, setUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  // Модалка
  const [modal, setModal] = useState<boolean>(false);

  const dispatch = useAppDispanch();
  const { albums, status, error } = useAppSelector((state) => state.albumsMichReducer);

  // форма создания нового объекта
  const formsOfCreation: IFormsOfCreation[] = [
    {
      type: "text",
      value: userId,
      setValue: setUserId,
      placeholder: "Введите № пользователя",
    },
    {
      type: "text",
      value: title,
      setValue: setTitle,
      placeholder: "Введите название нового альбома",
    },
  ];

  // создаём новый объект (album), как аргумент:
  //  для dispatch(addAlbumMich(album)) на этой странице. Строка 53.????????????????
  //  для addAlbumMich в AlbumsMichReducer. Строка 90????????????
  const album: IAlbum = {
    id: 0,
    title: title,
    userId: Number(userId),
  };

  const handleAddPost = () => {
    if (album.userId && album.title) {
      dispatch(addAlbumMich(album));
      setUserId("");
      setTitle("");
      setModal(false);
    }
  };

  // Сортировка и поиск
  const [filter, setFilter] = useState<IFilter>({ query: "", sort: "" });
  const options: IOption[] = [
    { value: "userId", name: "по номеру пользователя" },
    { value: "id", name: "по номеру альбома" },
    { value: "title", name: "по названию альбома" },
  ];

  // Пусть arrayData  - это наш массив с данными.
  const arrayData = albums;
  // // Получаем отсортированный массив.
  // const sortedArray = useMemo(() => {
  //   if (filter.sort && arrayData) {
  //     return [...arrayData].sort((a, b) => (a[filter.sort] > b[filter.sort] ? 1 : -1));
  //   }
  //   return arrayData;
  // }, [arrayData, filter.sort]);

  // // Отсортированный и отфильтрованный массив:
  // const sortedAndSearchedArray = useMemo(() => {
  //   if (sortedArray) {
  //     return sortedArray.filter((obj) => obj.title?.toLowerCase().includes(filter.query));
  //   }
  // }, [filter.query, sortedArray]);

  const sortedAndSearchedArray = useSortedAndSearchedArray(arrayData, filter.sort, filter.query);

  // Сортировка и поиск

  useEffect(() => {
    dispatch(fetchAlbumsMich());
  }, [dispatch]);

  return (
    <Container className="card">
      <div className="containerButton mt-2 mb-4">
        <Button variant="outline-success" onClick={() => setModal(true)}>
          Создать новый альбом
        </Button>
      </div>

      <Row>
        <h2 className="textCenter mb-4">Список альбомов пользователей из albumsMichReducer</h2>
        <h6>Логика сортировки и поиска вынесена в отдельный хук: useSortedAndSearchedArray.</h6>

        <SortFilter filter={filter} setFilter={setFilter} options={options} placeholder="Поиск по названию альбома" />

        <div>
          {status === "loading" && <h1 className="textCenter">Идёт загрузка</h1>}

          <div>{error && <h1 className="textCenter"> {error} </h1>}</div>
        </div>

        {sortedAndSearchedArray &&
          sortedAndSearchedArray.map((album) => <AlbumsMichItem album={album} key={album.id} />)}
      </Row>

      <MyModal visible={modal} setVisible={setModal}>
        <FormCreation formsOfCreation={formsOfCreation} addObject={handleAddPost} ButtonName="Добавить новый альбом" />
      </MyModal>
    </Container>
  );
};

export default AlbumsMichContainer;
