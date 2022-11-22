import React, { FC } from "react";
import { albumAPI } from "../../services/AlbumService";
import { Container, Row, Button } from "react-bootstrap";
import AlbumItem from "../items/AlbumItem";

const AlbumApiContainer: FC = () => {
  // Воспользуемся хуком, автоматически сгенерированным по имени эндпоинта:___ fetchAllAlbums
  const { data: albums, error, isLoading } = albumAPI.useFetchAllAlbumsQuery(25);

  return (
    <Container className="card">
      <Row>
        <div>
          <h3 className="textCenter">Список альбомов из albumAPI </h3>

          <div>{isLoading && <h1>Идёт загрузка</h1>}</div>

          <div>
            {error && (
              <h1>
                <> Произошла ошибка при загрузке. </>
              </h1>
            )}
          </div>

          {/* Добавляем проверку: если у нас есть альбомы, и они не undefined  */}
          {albums && albums.map((album) => <AlbumItem key={album.id} album={album} />)}
        </div>
      </Row>
    </Container>
  );
};

export default AlbumApiContainer;
