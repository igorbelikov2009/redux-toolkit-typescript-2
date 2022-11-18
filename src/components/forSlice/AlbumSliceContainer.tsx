import React, { FC, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchAlbums } from "../../store/reducers/ActionCreater";

const AlbumSliceContainer: FC = () => {
  const dispatch = useAppDispanch();
  const { albums, isLoading, error } = useAppSelector((state) => state.albumReducer);

  useEffect(() => {
    dispatch(fetchAlbums);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список альбомов из albumReducer</h2>

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

          {albums.map((album) => (
            <Card key={album.id}>
              <i>
                <b> {album.userId}</b> {album.title}
              </i>
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default AlbumSliceContainer;
