import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { IAlbum } from "../../../models/types";
import { useAppDispanch } from "../../../hooks/redux";
import { deleteAlbumMich, editAlbumMich } from "../../../store/michReducer/albumsMichReducer";
import { useHistory } from "react-router-dom";

interface AlbumsMichItemProps {
  album: IAlbum;
}

const AlbumsMichItem: FC<AlbumsMichItemProps> = ({ album }) => {
  const history = useHistory();
  const dispatch = useAppDispanch();

  const handleUpdate = (e: React.MouseEvent) => {
    const userId = prompt("Введите номер пользователя");
    const title = prompt("Введите название альбома");
    dispatch(editAlbumMich({ ...album, userId, title }));
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push(`/michael/albums/${album.id}`);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteAlbumMich(album.id));
  };
  return (
    <Card onClick={handleUpdate}>
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
            <Button variant="outline-success" className="mt-2" onClick={handleOpen}>
              Открыть
            </Button>

            <Button variant="outline-danger" className="mt-2" onClick={handleRemove}>
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AlbumsMichItem;
