import React, { FC } from "react";

interface PageAlbumsOfUserProps {
  id?: string;
}
const PageAlbumsOfUser: FC<PageAlbumsOfUserProps> = ({ id }) => {
  return (
    <div>
      <h1 className="mt-6">Вы открыли страницу альбомов пользователя {id} </h1>
    </div>
  );
};

export default PageAlbumsOfUser;
