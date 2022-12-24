import React, { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes, MAIN_ROUTE } from "../routes";

const AppRouter: FC = () => {
  return (
    <Switch>
      {routes.map(({ path, Render, Component }) => (
        <Route key={path} path={path} render={Render} component={Component} exact />
      ))}

      <Redirect to={MAIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
