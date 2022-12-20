import React, { FC, useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { useSortedAndSearchedArray } from "../../hooks/useSortedAndSearchedArray";
import { IFilter, IPhoto } from "../../models/types";
import { addPhotoMich, getPhotosMich } from "../../store/michReducer/photosMichReducer";
import PaginationButtons from "../gui/PaginationButtons";
import RoutesBlock from "../gui/RoutesBlock";
import MySelect, { IOption } from "../gui/select/MySelect";
import FormCreation, { IFormsOfCreation } from "../modal/FormCreation";
import MyModal from "../modal/MyModal";
import SortFilter from "../SortFilter";
import PhotoMichItem from "./itemMich/PhotoMichItem";

const PhotosMichContainer: FC = () => {
  const history = useHistory();
  const location = history.location.pathname;

  const [modal, setModal] = useState<boolean>(false);

  // for pagination
  const [limit, setLimit] = useState<number>(50);
  const [page, setPage] = useState<number>(1);

  // для создания нового объекта photo
  const [albumId, setAlbumId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const dispatch = useAppDispanch();
  const { res, isLoading, error } = useAppSelector((state) => state.photosMichReducer);
  const photos = res.photos;
  const totalCount = res.totalCount;
  const countPage = Math.ceil(totalCount / limit);
  const pages: number[] = [];
  for (let i = 0; i < countPage; i++) {
    pages.push(i + 1);
  }
  // console.log(totalCount, countPage, pages);
  const optionsLimit: IOption[] = [
    { value: "25", name: 25 },
    { value: "50", name: 50 },
    { value: "100", name: 100 },
    { value: "500", name: 500 },
    { value: "1000", name: 1000 },
  ];

  // форма создания нового объекта
  const formsOfCreation: IFormsOfCreation[] = [
    { type: "text", value: albumId, setValue: setAlbumId, placeholder: "Введите номер альбома" },
    { type: "text", value: title, setValue: setTitle, placeholder: "Введите название фото" },
    { type: "text", value: url, setValue: setUrl, placeholder: "Введите url фото" },
    { type: "text", value: thumbnailUrl, setValue: setThumbnailUrl, placeholder: "Введите thumbnailUrl фото" },
  ];
  // создаём новый объект (photo)
  const photo: IPhoto = {
    albumId: Number(albumId),
    id: 0,
    title: title,
    url: url,
    thumbnailUrl: thumbnailUrl,
  };

  const handleAddPhoto = () => {
    if (photo.albumId && photo.title && photo.url && photo.thumbnailUrl) {
      dispatch(addPhotoMich(photo));
      setAlbumId("");
      setTitle("");
      setUrl("");
      setThumbnailUrl("");
      setModal(false);
    }
  };

  // Сортировка и поиск
  const [filter, setFilter] = useState<IFilter>({ sort: "", query: "" });
  const optionsSort: IOption[] = [
    { value: "albumId", name: "по номеру альбома" },
    { value: "id", name: "по номеру фото" },
    { value: "title", name: "по названию фото" },
    { value: "url", name: "по указателю ресурса URL" },
  ];
  // Пусть arrayData  - это наш массив с данными.
  const arrayData = photos;
  const sortedAndSearchedArray = useSortedAndSearchedArray(arrayData, filter.sort, filter.query);
  // Сортировка и поиск

  useEffect(() => {
    dispatch(getPhotosMich({ limit, page }));
  }, [dispatch, limit, page]);

  return (
    <div>
      <div className="routeBar">
        <RoutesBlock location={location} />
      </div>

      <div className="rightBlock">
        <div className="card mt-5">
          <Row>
            <div className="mb-4">
              <MySelect
                titleSelect="Выберите количество фоток на странице"
                defaultValue="Выберите количество фоток на странице"
                disabled={true}
                onChangeValue={setLimit}
                value={limit}
                options={optionsLimit}
              />
            </div>

            <PaginationButtons countPage={countPage} page={page} pages={pages} setPage={setPage} />

            <h2 className="textCenter mb-4">Список альбомов фото из photosMichReducer</h2>
            <h6>Логика сортировки и поиска вынесена в отдельный хук: useSortedAndSearchedArray.</h6>

            <SortFilter
              filter={filter}
              setFilter={setFilter}
              options={optionsSort}
              placeholder="Поиск по названию фото"
            />

            <div>
              {isLoading && <h1 className="textCenter">Идёт загрузка</h1>}
              {error && <h1 className="textCenter"> {error}</h1>}
            </div>

            <div className="containerButton mt-2 mb-4">
              <Button variant="outline-success" onClick={() => setModal(true)}>
                Создать новое фото
              </Button>
            </div>

            {sortedAndSearchedArray &&
              sortedAndSearchedArray.map((photo) => <PhotoMichItem key={photo.id} photo={photo} />)}
          </Row>

          <MyModal visible={modal} setVisible={setModal}>
            <FormCreation
              formsOfCreation={formsOfCreation}
              addObject={handleAddPhoto}
              ButtonName="Добавить новое фото"
            />
          </MyModal>
        </div>
      </div>
    </div>
  );
};

export default PhotosMichContainer;
