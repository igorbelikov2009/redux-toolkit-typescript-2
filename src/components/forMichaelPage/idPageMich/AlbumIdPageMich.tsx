import React, { FC, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispanch, useAppSelector } from "../../../hooks/redux";
import { fetchAlbumByID, fetchPhotosFromAlbums } from "../../../store/michReducer/albumsMichReducer";
import { MICHAEL_ALBUMS_ROUTE, MICHAEL_PHOTOS_ROUTE } from "../../../routes";

interface IDParams {
  id?: string;
}

const AlbumIdPageMich: FC = () => {
  const dispatch = useAppDispanch();
  const { id } = useParams<IDParams>();
  const history = useHistory();

  const { album, photos, error, errorPhotos } = useAppSelector((state) => state.albumsMichReducer);
  // console.log(album, error);
  // console.log(photos, errorPhotos);

  useEffect(() => {
    dispatch(fetchAlbumByID(id));
    dispatch(fetchPhotosFromAlbums(id));
  }, [dispatch, id]);

  const toAlbumsPage: () => void = () => {
    history.push(MICHAEL_ALBUMS_ROUTE);
  };
  const toPhotoPage: () => void = () => {
    history.push(MICHAEL_PHOTOS_ROUTE);
  };

  return (
    <Card className="mt-6">
      <div className="mt-2 mb-4">
        {error ? (
          <h2>{error} </h2>
        ) : (
          <div>
            <div>
              <h1>Вы открыли страницу альбома ID = {id} </h1>

              <div>
                <div className="cardBlock">
                  <div className="cardPhoto">
                    <img className="albumImageMich" src="https://i.pravatar.cc/" alt="avatar" />
                  </div>

                  <div className="cardPhotoDescriptionMich">
                    <Card.Title>
                      <i> пользователь № </i> <b> {album.userId} </b>
                    </Card.Title>
                    <i className="displayBlock">
                      Альбом № <b> {album.id} </b>
                    </i>

                    <i className="displayBlock">
                      <b> Название: </b> {album.title}.
                    </i>
                  </div>

                  <div className="cardButton">
                    <div className="flexColumn">
                      <Button variant="outline-success" className="mt-2" onClick={toAlbumsPage}>
                        На страницу альбомов
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {errorPhotos ? (
                <h3>{errorPhotos} </h3>
              ) : (
                <div>
                  <div className="cardBlock">
                    <div className="cardDescription">
                      <h4 className="mt-4"> Фотографии из этого альбома </h4>
                    </div>
                    <div className="cardButton">
                      <Button variant="outline-primary" className="mt-2" onClick={toPhotoPage}>
                        К фотографиям
                      </Button>
                    </div>
                  </div>

                  {photos &&
                    photos.map((photo) => (
                      <Card className="post" key={photo.id}>
                        <div className="cardBlock">
                          <div className="cardDescription">
                            <Card.Title>
                              <i> альбом № </i> <b> {photo.albumId}</b>
                            </Card.Title>

                            <i className="displayBlock">
                              <i>
                                фото № <b> {photo.id} </b>
                              </i>
                            </i>

                            <i className="displayBlock">
                              <i>
                                <b>название фото: </b> {photo.title}
                              </i>
                            </i>

                            <i className="displayBlock">
                              <i>
                                <b>url: </b>
                                {photo.url}
                              </i>
                            </i>

                            <i className="displayBlock">
                              <i>
                                <b>thumbnailUrl: </b> {photo.thumbnailUrl}
                              </i>
                            </i>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AlbumIdPageMich;
