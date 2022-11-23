import React, { FC } from "react";
import { albumAPI } from "../../services/AlbumService";
import { Container, Row, Button } from "react-bootstrap";
import AlbumItem from "../items/AlbumItem";
import { IAlbum } from "../../models/types";

const AlbumApiContainer: FC = () => {
  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ fetchAllAlbums
  const { data: albums, error, isLoading } = albumAPI.useFetchAllAlbumsQuery(25);

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ createAlbum
  const [createAlbum, { error: createError }] = albumAPI.useCreateAlbumMutation();

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ updateAlbum
  const [updateAlbum, { error: updateError }] = albumAPI.useUpdateAlbumMutation();

  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ deleteAlbum
  const [deleteAlbum, { isLoading: deleteIsLoading }] = albumAPI.useDeleteAlbumMutation();

  const handleCreate = async () => {
    const title = prompt("Введите название альбома") || "";
    await createAlbum({ title } as IAlbum);
  };

  const handleUpdate = (album: IAlbum) => {
    updateAlbum(album);
  };
  const handleRemove = (album: IAlbum) => {
    deleteAlbum(album);
  };

  return (
    <Container className="card">
      <Row>
        <div>
          <h3 className="textCenter">Список альбомов из albumAPI </h3>

          <div className="containerButton">
            <Button variant="outline-success" onClick={handleCreate}>
              Добавить новый альбом
            </Button>
          </div>

          <div>
            {isLoading && <h1>Идёт загрузка</h1>}
            {deleteIsLoading && <h1>Идёт удаление</h1>}
          </div>

          <div>
            {error && (
              <h1>
                <> Произошла ошибка при загрузке. </>
              </h1>
            )}

            {updateError && (
              <h1>
                <> Произошла ошибка при обновлении. </>
              </h1>
            )}

            {createError && (
              <h1>
                <> Произошла ошибка при создании. </>
              </h1>
            )}
          </div>

          {/* Добавляем проверку: если у нас есть альбомы, и они не undefined  */}
          {albums &&
            albums.map((album) => (
              <AlbumItem key={album.id} album={album} update={handleUpdate} remove={handleRemove} />
            ))}
        </div>
      </Row>
    </Container>
  );
};

export default AlbumApiContainer;
