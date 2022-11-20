import React, { FC } from "react";
import { IPhoto } from "../../models/types";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

interface PhotoItemProps {
  photo: IPhoto;
}

const PhotoItem: FC<PhotoItemProps> = ({ photo }) => {
  const deletePhoto: () => void = () => {
    console.log("deletePhoto");
  };
  return (
    <Card className="post">
      <div className="cardBlock">
        <div className="cardDescription">
          <Card.Title>
            <i> Из альбома под номером: </i> <b> {photo.albomId} </b>
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

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2 " onClick={() => deletePhoto()}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PhotoItem;
