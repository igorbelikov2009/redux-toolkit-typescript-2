import React, { FC, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context";
import { routes, MAIN_ROUTE, michaelRoutes, publicRoutes, LOGIN } from "../routes";
import Loader from "./gui/loader/Loader";

const AppRouter: FC = () => {
  // const isAuth: boolean = false;
  const { isAuth, isLoading } = useContext(AuthContext);
  // isLoading и Loader в данном месте нужен для того, чтобы нас не редиректило
  // на главную страницу при обновлении любой другой. isLoading асинхронно
  // изменяется на странице App.tsx в useEffect() и этим даёт временную задержку,
  // необходимую для того, чтобы нас нередиректнуло.
  // Пока идёт авторизация, роутер у нас не работает и нас никуда не редиректит.
  // Роутер начинает работать, когда становится известно: авторизованн пользователь,
  // или нет.

  if (isLoading) {
    // Loader в данном месте нужен для того, чтобы отключить роутер на время
    // проверки авторизации в useEffect(() => {
    //   if (localStorage.getItem("auth")) {
    //     setAuth(true);
    //   }
    //   setLoading(false);
    // }, []);
    // на странице App.tsx, чтобы нас не редиректило на главную страницу.
    // Эта проверка авторизации происходит каждый раз при обновлении любой страницы.
    return <Loader />;
  }

  return isAuth ? (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} render={route.Render} component={route.Component} exact />
      ))}

      {michaelRoutes.map(({ path, Render, Component }) => (
        <Route key={path} path={path} render={Render} component={Component} exact />
      ))}

      <Redirect to={MAIN_ROUTE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Render, Component }) => (
        <Route key={path} path={path} render={Render} component={Component} exact />
      ))}

      <Redirect to={LOGIN} />
    </Switch>
  );
};

export default AppRouter;
