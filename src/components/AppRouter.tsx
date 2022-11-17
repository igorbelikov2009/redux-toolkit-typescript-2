import React, { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes, MAIN_ROUTE } from "../routes";

const AppRouter: FC = () => {
  return (
    <Switch>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}

      <Redirect to={MAIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
