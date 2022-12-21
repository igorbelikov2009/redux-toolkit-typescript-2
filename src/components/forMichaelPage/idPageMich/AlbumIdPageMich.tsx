import React, { FC, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispanch, useAppSelector } from "../../../hooks/redux";
import { fetchAlbumByID } from "../../../store/michReducer/albumsMichReducer";
import { MICHAEL_ALBUMS_ROUTE } from "../../../routes";

interface IDParams {
  id?: string;
}

const AlbumIdPageMich: FC = () => {
  const dispatch = useAppDispanch();
  const { id } = useParams<IDParams>();
  const history = useHistory();

  const { album, error, errorPhotos } = useAppSelector((state) => state.albumsMichReducer);
  console.log(album);

  useEffect(() => {
    dispatch(fetchAlbumByID(id));
  }, [dispatch, id]);

  const comeBack: () => void = () => {
    history.push(MICHAEL_ALBUMS_ROUTE);
  };

  return (
    <Card className="mt-6">
      <div className="mt-2 mb-4">
        {error ? (
          <h2>{error} </h2>
        ) : (
          <div>
            <h1>Вы открыли страницу альбома ID = {id} </h1>

            <Card>
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
                    <Button variant="outline-success" className="mt-2" onClick={comeBack}>
                      Вернуться назад
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AlbumIdPageMich;
