import React, { FC, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { IAlbum } from "../../models/types";
import { addAlbumMich, fetchAlbumsMich } from "../../store/michReducer/albumsMichReducer";
import FormCreation, { IFormsOfCreation } from "../modal/FormCreation";
import MyModal from "../modal/MyModal";
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

        <div>
          {status === "loading" && <h1 className="textCenter">Идёт загрузка</h1>}

          <div>{error && <h1 className="textCenter"> {error} </h1>}</div>
        </div>

        {albums && albums.map((album) => <AlbumsMichItem album={album} key={album.id} />)}
      </Row>

      <MyModal visible={modal} setVisible={setModal}>
        <FormCreation formsOfCreation={formsOfCreation} addObject={handleAddPost} ButtonName="Добавить новый альбом" />
      </MyModal>
    </Container>
  );
};

export default AlbumsMichContainer;
