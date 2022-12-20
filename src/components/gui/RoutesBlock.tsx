import React, { FC } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IButtonsRoute } from "../../models/types";
import {
  MICHAEL_ALBUMS_ROUTE,
  MICHAEL_COMMENTS_ROUTE,
  MICHAEL_PHOTOS_ROUTE,
  MICHAEL_POSTS_ROUTE,
  MICHAEL_PRODUCTS_ROUTE,
  MICHAEL_ROUTE,
  MICHAEL_TODOS_ROUTE,
  MICHAEL_USERS_ROUTE,
} from "../../routes";

interface RoutesBlockProps {
  location: string;
}

const RoutesBlock: FC<RoutesBlockProps> = ({ location }) => {
  const buttonsRoute: IButtonsRoute[] = [
    { path: MICHAEL_ROUTE, title: "MichaelPage" },
    { path: MICHAEL_USERS_ROUTE, title: "Users" },
    { path: MICHAEL_POSTS_ROUTE, title: "Posts" },
    { path: MICHAEL_COMMENTS_ROUTE, title: "Comments" },
    { path: MICHAEL_ALBUMS_ROUTE, title: "Albums" },
    { path: MICHAEL_PHOTOS_ROUTE, title: "Photos" },
    { path: MICHAEL_TODOS_ROUTE, title: "Todos" },
    { path: MICHAEL_PRODUCTS_ROUTE, title: "Products" },
  ];

  const history = useHistory();
  return (
    <div className="flexColumn">
      {buttonsRoute &&
        buttonsRoute.map((route) => (
          <Button
            key={route.path}
            className="fullWidth mY"
            onClick={() => {
              history.push(route.path);
            }}
            variant="outline-success"
            active={location === route.path}
          >
            {route.title}
          </Button>
        ))}
    </div>
  );
};

export default RoutesBlock;
