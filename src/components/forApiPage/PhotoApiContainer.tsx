import React, { FC } from "react";
import { photoAPI } from "../../services/PhotoService";
import { Container, Row, Button } from "react-bootstrap";
// import PhotoItem from "../items/PhotoItem";
import { IPhoto } from "../../models/types";
import PhotoItemApi from "../items/PhotoItemApi";

const PhotoApiContainer: FC = () => {
  const { data: photos, isLoading, error } = photoAPI.useFetchAllPhotosQuery(25);
  const [createPhoto, { isError: createIsError }] = photoAPI.useCreatePhotoMutation();
  const [updatePhoto, { isError: updateError }] = photoAPI.useUpdatePhotoMutation();
  const [deletePhoto, { error: deleteError }] = photoAPI.useDeletePhotoMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название фото") || "";
    const url = prompt("Введите url фото") || "";
    const thumbnailUrl = prompt("Введите thumbnailUrl фото") || "";
    await createPhoto({ title, url, thumbnailUrl } as IPhoto);
  };

  const handleUpdate = (photo: IPhoto) => {
    updatePhoto(photo);
  };

  const handleRemove = (photo: IPhoto) => {
    deletePhoto(photo);
  };

  return (
    <Container className="card">
      <Row>
        <div>
          <h3 className="textCenter">Список фоток из photoAPI</h3>

          <div className="containerButton">
            <Button variant="outline-success" onClick={handleCreate}>
              Добавить новое фото
            </Button>
          </div>

          <div> {isLoading && <h1> Идёт загрузка</h1>} </div>

          <div>
            <>
              {error && (
                <h1>
                  <> Произошла ошибка при загрузке. </>
                </h1>
              )}
              {createIsError && (
                <h1>
                  <> Произошла ошибка при создании. </>
                </h1>
              )}
              {updateError && (
                <h1>
                  <> Произошла ошибка при обновлении. </>
                </h1>
              )}
              {deleteError && (
                <h1>
                  <> Произошла ошибка при удалении. </>
                </h1>
              )}
            </>
          </div>
        </div>

        {/* Добавляем проверку: если у нас есть photos, и они не undefined  */}
        <div className="post">
          {photos &&
            photos.map((photo) => (
              <PhotoItemApi key={photo.id} photo={photo} update={handleUpdate} remove={handleRemove} />
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default PhotoApiContainer;
