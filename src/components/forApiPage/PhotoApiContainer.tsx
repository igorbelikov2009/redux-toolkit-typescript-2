import React, { FC } from "react";
import { photoAPI } from "../../services/PhotoService";
import { Container, Row } from "react-bootstrap";
import PhotoItem from "../items/PhotoItem";

const PhotoApiContainer: FC = () => {
  const { data: photos, isLoading, error } = photoAPI.useFetchAllPhotosQuery(25);

  return (
    <Container className="card">
      <Row>
        <div>
          <h3 className="textCenter">Список фоток из photoAPI</h3>

          <div> {isLoading && <h1> Идёт загрузка</h1>} </div>

          <div>
            {" "}
            <>
              {error && (
                <h1>
                  <> Произошла ошибка при загрузке. </>
                </h1>
              )}
            </>
          </div>
        </div>

        {/* Добавляем проверку: если у нас есть photos, и они не undefined  */}

        <div className="post">{photos && photos.map((photo) => <PhotoItem key={photo.id} photo={photo} />)}</div>
      </Row>
    </Container>
  );
};

export default PhotoApiContainer;
