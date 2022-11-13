import React from "react";
import "./App.css";
import { useAppDispanch, useAppSelector } from "./hooks/redux";
import { userSlice } from "./store/reducers/UserSlice";

function App() {
  const dispatch = useAppDispanch();

  // console.log(increment(5)); // получаем самый обыкновенный редаксовский экшен
  return <div className="App">App</div>;
}

export default App;
