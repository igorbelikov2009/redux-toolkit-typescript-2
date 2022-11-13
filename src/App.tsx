import React from "react";
import "./App.css";
import { useAppDispanch, useAppSelector } from "./hooks/redux";
import { userSlice } from "./store/reducers/UserSlice";

function App() {
  // Слайс содержит в себе экшенкреаторы и reducers. Соответственно,
  // экшенкреаторы мы можем вытащить вот таким образом.
  const { increment, decrement, multiplication, divide } = userSlice.actions;
  // То есть ни экшены, ни экшенкреаторы, ни типы для них, мы не создаём вручную.
  // За нас всё это делает redux-toolkit. Нам остаётся, созданный с помощью
  // redux-toolkitа экшенкреатер, только задиспачить. А сам счётчик, мы получаем
  // с помощью хука useAppSelector(). С помощью деструктуризации достаём нужное нам поле.
  const { count } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispanch();

  // console.log(increment(5)); // получаем самый обыкновенный редаксовский экшен
  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment(5))}>INCREMENT</button>

      <button onClick={() => dispatch(decrement(5))}>DECREMENT</button>

      <button onClick={() => dispatch(multiplication(5))}>УМНОЖИТЬ</button>

      <button onClick={() => dispatch(divide(5))}>Разделить</button>
    </div>
  );
}

export default App;
