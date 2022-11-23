import React, { FC, useEffect } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../hooks/redux";
import { fetchAsyncThunkAlbums } from "../../store/reducers/ActionCreater";

const AlbumAsyncSliceContainer: FC = () => {
  const dispatch = useAppDispanch();
  const { albums, isLoading, error } = useAppSelector((state) => state.albumAsuncThunkReducer);

  useEffect(() => {
    dispatch(fetchAsyncThunkAlbums());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <div>
          <h2 className="textCenter mb-4">Список альбомов из albumAsuncThunkReducer</h2>

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
              <div className="cardBlock">
                <div className="cardPhoto">
                  <img className="albumImage" src="https://i.pravatar.cc/" alt="avatar" />
                </div>

                <div className="cardPhotoDescription">
                  <i>
                    <b>{album.id}. </b>
                    {album.title}
                  </i>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default AlbumAsyncSliceContainer;
