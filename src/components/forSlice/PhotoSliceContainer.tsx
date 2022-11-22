import React, { FC, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { IPhoto } from "../../models/types";
import { fetchPhotos } from "../../store/reducers/ActionCreater";
import PhotoItem from "../items/PhotoItem";

const PhotoSliceContainer: FC = () => {
  const dispatch = useAppDispanch();
  const { photos, isLoading, error } = useAppSelector((state) => state.photoReducer);

  useEffect(() => {
    dispatch(fetchPhotos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleUpdate: () => void = () => {
  //   console.log("handleUpdate");
  // };
  // const handleRemove: () => void = () => {
  //   console.log("handleRemove");
  // };

  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список фотографий из photoReducer</h2>
          {isLoading && <h1> Идёт загрузка</h1>}
          <div>
            <>
              {error && (
                <h1>
                  <> {error} </>
                </h1>
              )}
            </>
          </div>
          {photos.map((photo) => (
            // <PhotoItem key={photo.id} photo={photo} update={handleUpdate} remove={handleRemove} />
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default PhotoSliceContainer;
