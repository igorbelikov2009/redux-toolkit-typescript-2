import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(true);
  // isLoading в данном месте нужен для того, чтобы нас не редиректило
  // на главную страницу при обновлении любой другой.

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
    }
    // здесь isLoading, асинхронно, с задержкой по времени, меняет своё
    // значение. Эта задержка с (true) на (false) не позволяет в AppRouter
    // сделать редирект на MAIN_ROUTE
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth, isLoading }}>
      <BrowserRouter>
        <AppRouter />
        <NavBar />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
