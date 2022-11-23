import React, { FC } from "react";
import { IAlbum } from "../../models/types";
import { Card, Button } from "react-bootstrap";

interface AlbumItemProps {
  album: IAlbum;
  update: (album: IAlbum) => void;
  remove: (album: IAlbum) => void;
}

const AlbumItem: FC<AlbumItemProps> = ({ album, update, remove }) => {
  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt("Введите название альбома") || "";
    update({ ...album, title });
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(album);
  };

  return (
    <Card onClick={handleUpdate}>
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

        <div className="cardButton">
          <Button onClick={handleRemove} variant="outline-primary">
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AlbumItem;
