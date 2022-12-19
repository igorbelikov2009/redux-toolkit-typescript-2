import React, { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { useAppDispanch } from "../../../hooks/redux";
import { IPhoto } from "../../../models/types";
import { deletePhotoMich, editPhotoMich } from "../../../store/michReducer/photosMichReducer";

interface PhotoMichItemProps {
  photo: IPhoto;
}

const PhotoMichItem: FC<PhotoMichItemProps> = ({ photo }) => {
  const dispatch = useAppDispanch();

  const handleUpdate = (e: React.MouseEvent) => {
    const albumId = Number(prompt("Введите номер альбома"));
    const title = prompt("Введите название фото");
    const url = prompt("Введите url фото");
    const thumbnailUrl = prompt("Введите thumbnailUrl фото");

    dispatch(editPhotoMich({ ...photo, albumId, title, url, thumbnailUrl }));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deletePhotoMich(photo.id));
  };

  return (
    <Card className="post" onClick={handleUpdate}>
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

        <div className="cardButton">
          <Button variant="outline-danger" className="mt-2 " onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PhotoMichItem;
