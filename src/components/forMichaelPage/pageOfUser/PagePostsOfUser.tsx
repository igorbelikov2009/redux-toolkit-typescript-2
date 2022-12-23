import React, { FC } from "react";

interface PagePostsOfUserProps {
  id?: string;
}

const PagePostsOfUser: FC<PagePostsOfUserProps> = ({ id }) => {
  return (
    <div>
      <h1 className="mt-6">Вы открыли страницу постов пользователя {id} </h1>
    </div>
  );
};

export default PagePostsOfUser;
