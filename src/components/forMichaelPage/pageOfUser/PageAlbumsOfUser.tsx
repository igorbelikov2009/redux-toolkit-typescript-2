import React, { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useAppDispanch, useAppSelector } from "../../../hooks/redux";
import { getUsersAlbums } from "../../../store/michReducer/usersMichReducer";

interface IDParams {
  id: string;
}

const PageAlbumsOfUser: FC = () => {
  const { id } = useParams<IDParams>();
  const dispatch = useAppDispanch();
  const history = useHistory();
  const { albums, error } = useAppSelector((state) => state.usersMichReducer);

  useEffect(() => {
    dispatch(getUsersAlbums(id));
  }, [dispatch, id]);

  return (
    <Card className="mt-6">
      <div className="mt-2 mb-4">
        {error ? (
          <h3 className="colorRed"> {error} </h3>
        ) : (
          <div>
            <div className="flexColumn">
              <h2>Вы открыли список альбомов пользователя {id} </h2>

              <div className="displayFlex mt-2 mb-2">
                <Button
                  variant="outline-success"
                  className="mAuto"
                  onClick={() => history.push(`/michael/users/${id}`)}
                >
                  На страницу пользователя
                </Button>
              </div>
            </div>

            {albums &&
              albums.map((album) => (
                <Card key={album.id}>
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

                    <div className="cardButton"></div>
                  </div>
                </Card>
              ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PageAlbumsOfUser;
