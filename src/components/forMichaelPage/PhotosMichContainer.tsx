import React, { FC, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { getPhotosMich } from "../../store/michReducer/photosMichReducer";
import PaginationButtons from "../gui/PaginationButtons";
import MySelect, { IOption } from "../gui/select/MySelect";
import PhotoMichItem from "./itemMich/PhotoMichItem";

const PhotosMichContainer: FC = () => {
  const [limit, setLimit] = useState<number>(50);
  const [page, setPage] = useState<number>(1);

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

  useEffect(() => {
    dispatch(getPhotosMich({ limit, page }));
  }, [dispatch, limit, page]);

  return (
    <Container className="card">
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

        <h2 className="textCenter mb-4">Список альбомов фото из albumsMichReducer</h2>
        <h6>Логика сортировки и поиска вынесена в отдельный хук: useSortedAndSearchedArray.</h6>

        <div>
          {isLoading && <h1 className="textCenter">Идёт загрузка</h1>}
          {error && <h1 className="textCenter"> {error}</h1>}
        </div>

        {photos && photos.map((photo) => <PhotoMichItem key={photo.id} photo={photo} />)}
      </Row>
    </Container>
  );
};

export default PhotosMichContainer;
