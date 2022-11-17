import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ApiPage from "./pages/ApiPage";
import AsyncThunkPage from "./pages/AsyncThunkPage";
import MainPage from "./pages/MainPage";
import SlicePage from "./pages/SlicePage";

function App() {
  return (
    <div>
      <MainPage />
      <ApiPage />
      <AsyncThunkPage />
      <SlicePage />
      <NavBar />
    </div>
  );
}

export default App;
