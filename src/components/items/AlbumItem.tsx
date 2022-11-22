import React, { FC } from "react";
import { IAlbum } from "../../models/types";
import { Card, Button } from "react-bootstrap";

interface AlbumItemProps {
  album: IAlbum;
}

const AlbumItem: FC<AlbumItemProps> = ({ album }) => {
  return (
    <Card>
      <div className="cardBlock">
        <div className="cardDescription">
          <i>
            <b> {album.userId}. </b> {album.title}
          </i>
        </div>

        <div className="cardButton">
          <Button variant="outline-primary">Удалить</Button>
        </div>
      </div>
    </Card>
  );
};

export default AlbumItem;
