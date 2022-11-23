import React, { FC, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchAsyncThunkPhotos } from "../../store/reducers/ActionCreater";
import PhotoItem from "../items/PhotoItem";

const PhotoAsyncSliceContainer: FC = () => {
  const dispatch = useAppDispanch();
  const { photos, isLoading, error } = useAppSelector((state) => state.photoAsuncThunkReducer);

  useEffect(() => {
    dispatch(fetchAsyncThunkPhotos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список фотографий из photoAsuncThunkReducer</h2>

          {isLoading && <h1>Идёт загрузка</h1>}

          {error && <h1>{error} </h1>}

          {photos && photos.map((photo) => <PhotoItem photo={photo} key={photo.id} />)}
        </div>
      </Row>
    </Container>
  );
};

export default PhotoAsyncSliceContainer;
