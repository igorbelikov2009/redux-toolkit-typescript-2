import React, { FC } from "react";
import { IPhoto } from "../../models/types";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

interface PhotoItemProps {
  photo: IPhoto;
  // update: (photo: IPhoto) => void;
  // remove: (photo: IPhoto) => void;
}

// const PhotoItem: FC<PhotoItemProps> = ({ photo, update, remove }) => {
//   const handleUpdate = (event: React.MouseEvent) => {
//     const albumId = prompt("Введите номер альбома") || "";
//     const title = prompt("Введите название фото") || "";
//     const url = prompt("Введите url фото") || "";
//     const thumbnailUrl = prompt("Введите thumbnailUrl фото") || "";
//     update({ ...photo, albumId, title, url, thumbnailUrl });
//   };

//   const handleRemove = (event: React.MouseEvent) => {
//     event.stopPropagation();
//     remove(photo);
//   };

const PhotoItem: FC<PhotoItemProps> = ({ photo }) => {
  // onClick={handleUpdate}
  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> Из альбома №: </i> <b> {photo.albumId} </b>
          </Card.Title>

          <i className="displayBlock">
            <i> фото № </i> <b> {photo.id}</b>
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

        {/* onClick={handleRemove} */}
        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2 ">
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PhotoItem;
