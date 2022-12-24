import React, { FC } from "react";
import { useParams } from "react-router-dom";

interface IDParams {
  id: string;
}

const PageTodosOfUser: FC = () => {
  const { id } = useParams<IDParams>();
  console.log(id);

  return (
    <div>
      <h1 className="mt-6">Вы открыли страницу со списком дел пользователя {id} </h1>
    </div>
  );
};

export default PageTodosOfUser;
