import React, { FC } from "react";
import { IPhoto } from "../../models/types";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

interface PhotoItemApiProps {
  photo: IPhoto;
  update: (photo: IPhoto) => void;
  remove: (photo: IPhoto) => void;
}

const PhotoItemApi: FC<PhotoItemApiProps> = ({ photo, update, remove }) => {
  const handleUpdate = (event: React.MouseEvent) => {
    // const albumId = Number(prompt("Введите номер альбома") || "");
    const title = prompt("Введите название фото") || "";
    const url = prompt("Введите url фото") || "";
    const thumbnailUrl = prompt("Введите thumbnailUrl фото") || "";
    update({ ...photo, title, url, thumbnailUrl });
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(photo);
  };

  return (
    <Card className="post" onClick={handleUpdate}>
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> фото № </i> <b> {photo.id}</b>
          </Card.Title>

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

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2 " onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PhotoItemApi;
