import React, { FC } from "react";

interface PageTodosOfUserProps {
  id?: string;
}

const PageTodosOfUser: FC<PageTodosOfUserProps> = ({ id }) => {
  return (
    <div>
      <h1 className="mt-6">Вы открыли страницу со списком дел пользователя {id} </h1>
    </div>
  );
};

export default PageTodosOfUser;
